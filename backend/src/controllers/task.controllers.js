import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { Task } from "../models/task.models.js";
import { SubTask } from "../models/subtask.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import { TaskStatusEnum, UserRolesEnum } from "../utils/constants.js";

const getTasks = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project does not exist.");
  }

  const tasks = await Task.find({
    project: projectId,
  }).populate("assignedTo", "avatar username fullName");

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }

  if (assignedTo && !mongoose.Types.ObjectId.isValid(assignedTo)) {
    throw new ApiError(400, "Invalid assigned user id");
  }

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project does not exist.");
  }

  // Add it here
  if (assignedTo) {
    const user = await User.findById(assignedTo);

    if (!user) {
      throw new ApiError(404, "Assigned user not found");
    }
  }

  const files = req.files || [];

  const attachments = files.map((file) => {
    return {
      url: `${process.env.SERVER_URL}/images/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size,
    };
  });

  const task = await Task.create({
    title,
    description,
    project: projectId,
    assignedTo: assignedTo || undefined,
    status,
    assignedBy: req.user._id,
    attachments,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task Created Successfully"));
});

const getTaskById = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new ApiError(400, "Invalid task id");
  }

  const task = await Task.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(taskId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "assignedTo",
        foreignField: "_id",
        as: "assignedTo",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              fullName: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "subtasks",
        localField: "_id",
        foreignField: "task",
        as: "subtasks",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "createdBy",
              foreignField: "_id",
              as: "createdBy",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    username: 1,
                    fullName: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              createdBy: {
                $arrayElemAt: ["$createdBy", 0],
              },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        assignedTo: {
          $arrayElemAt: ["$assignedTo", 0],
        },
      },
    },
  ]);

  if (!task.length) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task[0], "Task fetched successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;
  const { title, description, assignedTo, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new ApiError(400, "Invalid task id");
  }

  if (assignedTo && !mongoose.Types.ObjectId.isValid(assignedTo)) {
    throw new ApiError(400, "Invalid assigned user id");
  }

  if (status && !Object.values(TaskStatusEnum).includes(status)) {
    throw new ApiError(400, "Invalid task status");
  }

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.project.toString() !== projectId) {
    throw new ApiError(400, "Task does not belong to this project");
  }

  if (assignedTo) {
    const user = await User.findById(assignedTo);

    if (!user) {
      throw new ApiError(404, "Assigned user not found");
    }
  }

  const updateData = {};

  if (title) updateData.title = title;

  if (description !== undefined) updateData.description = description;

  if (assignedTo !== undefined) updateData.assignedTo = assignedTo;

  if (status) updateData.status = status;

  const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
    returnDocument: "after",
    runValidators: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTask, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new ApiError(400, "Invalid task id");
  }

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.project.toString() !== projectId) {
    throw new ApiError(400, "Task does not belong to this project");
  }

  await SubTask.deleteMany({
    task: task._id,
  });

  await Task.findByIdAndDelete(taskId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});

const updateSubTask = asyncHandler(async (req, res) => {
  const { subTaskId } = req.params;
  const { title, isCompleted } = req.body;

  if (!mongoose.Types.ObjectId.isValid(subTaskId)) {
    throw new ApiError(400, "Invalid subtask id");
  }

  const subTask = await SubTask.findById(subTaskId);

  if (!subTask) {
    throw new ApiError(404, "Subtask not found");
  }

  if (req.user.role === UserRolesEnum.MEMBER) {
    if (typeof isCompleted !== "boolean") {
      throw new ApiError(400, "Members can only update completion status");
    }

    subTask.isCompleted = isCompleted;
  } else {
    if (title !== undefined) {
      subTask.title = title;
    }

    if (typeof isCompleted === "boolean") {
      subTask.isCompleted = isCompleted;
    }
  }

  await subTask.save();

  return res
    .status(200)
    .json(new ApiResponse(200, subTask, "Subtask updated successfully"));
});

const createSubTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;
  const { title } = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new ApiError(400, "Invalid task id");
  }

  if (!title?.trim()) {
    throw new ApiError(400, "Subtask title is required");
  }

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.project.toString() !== projectId) {
    throw new ApiError(400, "Task does not belong to this project");
  }

  const subTask = await SubTask.create({
    title,
    task: taskId,
    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, subTask, "Subtask created successfully"));
});

const deleteSubTask = asyncHandler(async (req, res) => {
  const { subTaskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(subTaskId)) {
    throw new ApiError(400, "Invalid subtask id");
  }

  const subTask = await SubTask.findById(subTaskId);

  if (!subTask) {
    throw new ApiError(404, "Subtask not found");
  }

  await SubTask.findByIdAndDelete(subTaskId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Subtask deleted successfully"));
});

export {
  createSubTask,
  createTask,
  deleteTask,
  deleteSubTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
};
