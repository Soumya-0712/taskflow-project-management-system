import { body, param } from "express-validator";
import {
  AvailableUserRole,
  AvailableTaskStatuses,
} from "../utils/constants.js";
import mongoose from "mongoose";
import { upload } from "../middlewares/multer.middleware.js";
const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is Required")
      .isLowercase()
      .withMessage("username must be in lower case")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long."),
    body("password").trim().notEmpty().withMessage("Password cannot be empty"),
    body("fullName").optional().trim(),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("password").notEmpty().withMessage("Password field cannot be empty"),
  ];
};

const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old Password is required"),
    body("newPassword")
      .notEmpty()
      .withMessage("Password field cannot be empty"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Email is Invalid"),
  ];
};

const userResetPasswordValidator = () => {
  return [
    body("newPassword")
      .notEmpty()
      .withMessage("Password field cannot be empty"),
  ];
};

const createProjectValidator = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").optional(),
  ];
};

const addMemberToProjectValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("role")
      .notEmpty()
      .withMessage("Role is Required")
      .isIn(AvailableUserRole)
      .withMessage("Role is invalid"),
  ];
};

const createTaskValidator = () => [
  param("projectId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid project id"),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Task title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("assignedTo")
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid assigned user id"),

  body("status")
    .optional()
    .isIn(AvailableTaskStatuses)
    .withMessage("Invalid task status"),
];

const updateTaskValidator = () => [
  param("projectId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid project id"),

  param("taskId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid task id"),

  body().custom((value) => {
    const allowedFields = ["title", "description", "assignedTo", "status"];

    const hasField = allowedFields.some((field) => value[field] !== undefined);

    if (!hasField) {
      throw new Error("At least one field must be provided for update");
    }

    return true;
  }),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3, max: 100 })
    .withMessage("Task title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("assignedTo")
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid assigned user id"),

  body("status")
    .optional()
    .isIn(AvailableTaskStatuses)
    .withMessage("Invalid task status"),
];

const createSubTaskValidator = () => [
  param("projectId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid project id"),

  param("taskId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid task id"),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Subtask title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Subtask title must be between 3 and 100 characters"),
];

const updateSubTaskValidator = () => [
  param("projectId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid project id"),

  param("subTaskId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid subtask id"),

  body().custom((value) => {
    const allowedFields = ["title", "isCompleted"];

    const hasField = allowedFields.some((field) => value[field] !== undefined);

    if (!hasField) {
      throw new Error("At least one field must be provided for update");
    }

    return true;
  }),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Subtask title cannot be empty")
    .isLength({ min: 3, max: 100 })
    .withMessage("Subtask title must be between 3 and 100 characters"),

  body("isCompleted")
    .optional()
    .isBoolean()
    .withMessage("isCompleted must be a boolean value")
    .toBoolean(),
];

export {
  userRegisterValidator,
  userLoginValidator,
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userResetPasswordValidator,
  createProjectValidator,
  addMemberToProjectValidator,
  createTaskValidator,
  updateTaskValidator,
  createSubTaskValidator,
  updateSubTaskValidator,
};
