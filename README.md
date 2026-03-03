# School Core - Fullstack Assessment

This repository contains the fullstack implementation for the School Core dashboard assessment, featuring a robust Node.js/Express backend and a responsive React frontend with Tailwind CSS.

## 🏗 Project Architecture

The application is structured correctly as a monorepo containing two distinct projects:

- `/assessment-backend`: Node.js, Express, Sequelize (PostgreSQL), Zod, Swagger
- `/assessment-frontend`: React, Vite, Tailwind CSS, Axios, Context API, React Router v6

---

## 🚀 Backend (`/assessment-backend`)

The backend is a RESTful API built with Express and Sequelize, utilizing PostgreSQL as the primary database. It features secure JWT authentication, role-based access control, and comprehensive request validation using Zod.

### Features

- **Authentication:** Secure login and registration with Bcrypt password hashing.
- **Role-Based Authorization:** Middleware restricting access based on User attributes (`principal`, `teacher`, `student`, `staff`).
- **Swagger Documentation:** Auto-generated interactive API docs (`/api-docs`).
- **Leave Management System:** Full CRUD for requesting, approving, and declining staff leave.

### Setup Instructions

1. **Navigate to the backend directory:**

   ```bash
   cd assessment-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root of `assessment-backend` and configure your database and JWT secret:

   ```env
   PORT=5001
   DATABASE_URL=postgres://user:password@host/dbname
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   _The server will start at `http://localhost:5001`. On the first run, Sequelize will automatically sync the database schemas and generate dummy users and leave requests._

### Key Endpoints

- `POST /api/auth/login`: Authenticate and receive a JWT.
- `GET /api/leave/my-requests`: Fetch logged-in user leave requests.
- `GET /api/leave/all-requests`: (Principal Admin only) Fetch all requests.
- `POST /api/leave`: Submit a new leave request.
- `PUT /api/leave/:id/respond`: (Principal Admin only) Approve or reject a leave request.

Detailed documentation for all endpoints is available at `https://backend-assessment-uprm.onrender.com/api-docs/` via Swagger UI.

---

## 🎨 Frontend (`/assessment-frontend`)

The frontend is a beautifully designed single-page application built with React, Vite, and Tailwind CSS. It connects smoothly to the backend API via Axios.

### Features

- **Responsive Dashboard Layout:** Adapts elegantly to desktop and mobile constraints.
- **Authentication Flow:** Protected routes via `AuthContext` utilizing JWT storage.
- **Interactive Leave Requests Page:** Dedicated UI to submit new leave requests via animated Modals, and render dynamic dashboard cards representing leave status.
- **Configured Build Pipeline:** Uses Vite for lightning-fast HMR and optimized production bundling.

### Setup Instructions

1. **Navigate to the frontend directory:**

   ```bash
   cd assessment-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root of `assessment-frontend` to configure the API endpoint mapping:

   ```env
   VITE_API_URL=http://localhost:5001
   ```

   _(Note: The deployed application points to `https://backend-assessment-uprm.onrender.com`)_

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   _The application will be accessible at `http://localhost:5173`._

### Building for Production

To bundle the frontend application for production deployment:

```bash
npm run build
```

The optimized static output will be generated in the `dist/` directory.

---

## 👥 Authentication Dummy Accounts

If you are running the environment freshly, the backend seeding utility auto-creates the following dummy accounts for testing out the different permission levels:

| Role          | Email                   | Password   |
| ------------- | ----------------------- | ---------- |
| **Principal** | `peterside@example.com` | `password` |
| **Teacher**   | `teacher@gmail.com`     | `password` |
