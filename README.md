🚀 TaskFlow — MERN Stack Task Management System

A modern, full-stack Task Management Web Application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
TaskFlow is designed for productivity, allowing users to create, organize, prioritize, and track tasks with a clean UI, secure authentication, and scalable backend architecture.

📸 Preview
[DEMO VIDEO](Taskmanager_Demo/TaskManager-DEMO.png) !
[LIGHT MODE](Taskmanager_Demo/demoIMG.png)
[DARK MODE ](Taskmanager_Demo/demoIMG1.png) !


Landing Page
Dashboard
Task Create / Update Modal
Dark Mode UI
🧠 Key Highlights (What makes this project strong)
🔐 Secure JWT Authentication system
⚡ Fully RESTful API architecture
📱 Responsive design across devices (mobile,desktop)
🧩 Modular React component structure
🎯 Advanced Task system (pin, filter, priority, soft delete)
🌙 Dark / Light mode with persistence
🔍 Search + filtering + pagination support
🧠 Input validation using Zod
📦 Clean MVC backend structure
🎨 Modern responsive UI (Tailwind CSS)
🚀 Production-ready code organization
🏗️ Tech Stack
🖥️ Frontend
React.js (Vite)
React Router DOM
Axios
React Hook Form
React Hot Toast / Sonner
Lucide React Icons
Tailwind CSS
🧠 Backend
Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
Zod Validation
Middleware-based architecture
📁 Project Structure
🔹 client
client
├── public
│   ├── image.png
│   ├── image1.png
│   └── logo.png
├── src
│   ├── components
│   │   ├── dashboard
│   │   │   ├── CreateTaskModal.jsx
│   │   │   ├── dueDateHelpers.js
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskGrid.jsx
│   │   │   ├── TaskModal.jsx
│   │   │   └── Trash.jsx
│   │   ├── Input.jsx
│   │   ├── Navbar.jsx
│   │   └── ThemeContext.jsx
│   ├── contexts
│   │   ├── AuthContext.jsx
│   │   └── TaskContext.jsx
│   ├── hooks
│   │   └── useTasks.js
│   ├── model
│   │   ├── Account.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── pages
│   │   ├── Dashboard.jsx
│   │   └── LandingPage.jsx
│   ├── routes
│   │   ├── ProtectedRoutes.jsx
│   │   └── PublicRoute.jsx
│   ├── services
│   │   └── taskServices.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx

🔹 server
server
├── src
│   ├─ api
│   │   ├─ config
│   │   │   ├── schema
│   │   │   │   ├── taskSchema.js
│   │   │   │   └── userSchema.js
│   │   │   ├── validators
│   │   │   │   └── validators.js
│   │   │   └── db.js
│   │   └─ interface
│   │       ├── controller
│   │       │   ├── taskController.js
│   │       │   └── userController.js
│   │       ├── middleware
│   │       │   └── authMiddleware.js
│   │       └── routes
│   │           ├── task.js
│   │           └── user.js
│   └─ infrastructure
│       ├── env.js
│       └── routes.js
└── index.js


⚙️ Features
👤 Authentication
User Registration
Secure Login
User Update || Delete
JWT token-based auth
Protected routes middleware
📝 Task Management
Create tasks
Update tasks
Delete (soft delete to trash)
Permanent delete
Restore from trash
Pin / Unpin tasks
🔍 Advanced Task Controls
Filter by status (pending / completed / in-progress)
Filter by priority (low / medium / high)
Search tasks by title (regex-based)
Pagination support
🎨 UI / UX Features
Fully responsive layout
Dark / Light mode toggle
Smooth transitions
Modern glass-style navbar
Toast notifications for feedback
Clean modular components
🧠 Backend Architecture
🔐 Authentication Flow
JWT token generated on login
Token sent in Authorization: Bearer <token>
Middleware verifies token
req.userId injected for secure queries
📊 Task Schema (MongoDB)
title (String)
description (String)
status (pending | in-progress | completed)
priority (low | medium | high)
dueDate (Date)
tags (Array)
isPinned (Boolean)
deletedAt (Soft delete system)
userId (Reference to User)
⚡ API Endpoints
User
POST   /user/register
POST   /user/login
PUT    /user/update
DELETE /user/delete
Tasks
POST   /task/create
GET    /task/get
PUT    /task/update/:id
PATCH  /task/pin/:id
DELETE /task/delete/:id
GET    /task/trash
PATCH  /task/restore/:id
DELETE /task/force/:id
🎯 Validation System

Uses Zod schema validation

User input validation
Task creation/update validation
Query validation (search, filter, pagination)
🌙 Dark Mode System
Stored in localStorage
Applied via document.documentElement.classList
Tailwind dark: variants used
Persistent across refresh
🔗 Frontend–Backend Integration
Axios handles all API calls
Token automatically attached in headers
Protected routes secured via middleware
Clean separation of concerns
🚀 Performance Optimizations
Indexed MongoDB fields (userId, status, priority)
Regex-based prefix search optimization
Pagination to reduce payload size
Modular controller architecture
🧑‍💻 What I Learned / Built

This project demonstrates:

Full-stack MERN architecture understanding
Authentication + authorization flow
Real-world CRUD system design
Scalable backend structuring
Component-driven frontend architecture
API integration patterns
Production-level validation & error handling
📈 Future Improvements
📊 Analytics dashboard
📅 Calendar-based task view
🔔 Notifications system
🤖 AI task suggestions
☁️ Deployment (Render + Vercel)
📱 Mobile app (React Native)
🏁 Conclusion

TaskFlow is not just a CRUD project — it is a production-style task management system demonstrating real-world full-stack engineering practices, clean architecture, and scalable design patterns.

👨‍💻 Author

Built by RAHUL RANA
MERN Stack Developer | Full-Stack Enthusiast