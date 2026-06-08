# TaskFlow – Project Management & Team Collaboration Platform

TaskFlow is a full-stack project management and team collaboration platform designed to streamline project organization, task assignment, workflow tracking, and team management.

The application provides secure authentication, role-based authorization, project administration, task management, subtask tracking, file attachment support, and a modern dashboard interface.

---

## Features

### Authentication & Security

- User Registration and Login
- JWT Access Token Authentication
- Refresh Token Management
- Email Verification Workflow
- Forgot Password & Reset Password
- Secure Password Hashing using bcrypt
- Protected API Routes

### Role-Based Access Control

The platform supports three user roles:

- **Admin**
- **Project Admin**
- **Member**

Permissions are enforced at the project level to ensure secure access to resources and operations.

### Project Management

- Create Projects
- Update Project Details
- Delete Projects
- Manage Project Members
- Assign Roles to Members
- Project Ownership Management

### Task Management

- Create Tasks
- Update Tasks
- Delete Tasks
- Assign Tasks to Team Members
- Track Task Status
- Upload Task Attachments
- View Detailed Task Information

### Subtask Management

- Create Subtasks
- Update Subtasks
- Delete Subtasks
- Mark Subtasks as Completed
- Track Task Progress

### Backend Architecture

- RESTful API Design
- MVC Architecture
- Centralized Error Handling
- Request Validation using Express Validator
- Reusable Middleware Architecture
- MongoDB Aggregation Pipelines
- File Upload Management using Multer
- Modular and Scalable Code Structure

### Frontend (In Progress)

Current implementation includes:

- React + Vite Setup
- Tailwind CSS Integration
- Dashboard Layout
- Responsive Sidebar Navigation
- Header/Navbar Components
- Dashboard Analytics Widgets
- Task Distribution Visualization

Planned additions:

- Authentication Screens
- Project Management UI
- Task Management UI
- API Integration
- Role-Based User Experience
- Kanban Board
- Real-Time Updates

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- Express Validator

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts

---

## Project Structure

```text
taskflow-project-management-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── validators/
│   │   └── utils/
│   │
│   ├── public/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   │
│   └── package.json
│
├── screenshots/
│
└── README.md
```

---

## Getting Started

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file in the backend directory and configure:

```env
PORT=
MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

MAILTRAP_SMTP_HOST=
MAILTRAP_SMTP_PORT=
MAILTRAP_SMTP_USER=
MAILTRAP_SMTP_PASS=
```

---

## Screenshots

### Dashboard

![Dashboard](<Screenshot 2026-06-07 222959.png>)

---

## Future Enhancements

- Drag-and-Drop Kanban Board
- Real-Time Notifications
- Activity Logs
- Team Chat
- Advanced Search & Filtering
- Dashboard Analytics
- Docker Deployment
- CI/CD Pipeline
- Production Deployment

---

## Author

**Soumyadeep Paul**

Project developed as part of a full-stack software engineering portfolio focusing on scalable backend architecture, role-based access control, and modern project management workflows.
