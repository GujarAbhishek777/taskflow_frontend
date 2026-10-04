# TaskFlow Frontend Web Application 🎨⚡

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB.svg?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v6.30-CA4245.svg?style=flat&logo=react-router)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**TaskFlow Frontend** is a modern, responsive single-page web application (SPA) built with **React 19**, **Tailwind CSS**, **Chart.js**, and **React Router v6**. It serves as the user-facing web dashboard for the TaskFlow platform, enabling team collaboration, task management, analytics visualization, user role administration, and direct messaging across tenant organizations.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack & Libraries](#-tech-stack--libraries)
- [Application Views & Dashboards](#-application-views--dashboards)
- [Authentication & State Management](#-authentication--state-management)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Production Build & Deployment](#-production-build--deployment)

---

## ✨ Features

- **Responsive Multi-Tenant Dashboard**: Scoped view based on tenant organization (`Client`), displaying organization logo, active user details, and notification badge.
- **Collapsible Sidebar Layout**: Seamless navigation across Dashboard, Users, Tasks, Messages, and Analytics modules.
- **Task Management Module**:
  - Filter tasks by assigned user, due date, completion status, or overdue flag ("Due Date Passed").
  - Create and assign new tasks to team members via an intuitive modal interface (scoped for Admins & Task Creators).
- **User Management Module**:
  - View member directory cards with designations and emails.
  - Admin modal to add new users and assign role permissions (`Admin` or `Task Creator`).
- **Direct Messaging & Chat Window**:
  - Direct messaging between organization members.
  - Recent message snippets & full conversation chat drawer view (`ChatComponent`).
- **Interactive Data Visualizations**:
  - **Pie Chart**: Task status distribution on the main dashboard (`Created`, `In Progress`, `On Hold`, `Cancelled`, `Completed`).
  - **Bar Chart**: Comprehensive task overview analytics.
- **Landing Page & Authentication Flow**:
  - Public landing page highlighting platform features, stats, and quick actions.
  - Sign in, Sign up, and Password recovery forms.
- **Toast Notifications & Feedback**: Integrated with **SweetAlert2** (`Swal.fire`) for user actions and error alerts.

---

## 🛠 Tech Stack & Libraries

| Category | Technology |
| :--- | :--- |
| **Core Framework** | React 19 (`react`, `react-dom`) |
| **Routing** | React Router v6 (`react-router-dom`) |
| **Styling** | Tailwind CSS v3, PostCSS, Autoprefixer |
| **Icons** | React Icons (`react-icons/fa`), Lucide React (`lucide-react`) |
| **Data Visualizations** | Chart.js (`chart.js`) & React ChartJS 2 (`react-chartjs-2`) |
| **HTTP Client** | Axios (`axios`) |
| **UI Alerts & Modals** | SweetAlert2 (`sweetalert2`) |
| **Build & Tooling** | Create React App (`react-scripts`), `react-app-rewired`, `customize-cra` |

---

## 🖥 Application Views & Dashboards

### 1. Landing Page (`/`)
Public-facing showcase detailing TaskFlow features, client statistics, quick action triggers, and sign-in/up navigation. Automatically redirects authenticated users directly to the `/dashboard`.

### 2. Dashboard View (`/dashboard`)
Overview screen containing:
- **Task Distribution Pie Chart**: Visual breakdown of task statuses.
- **Recent Tasks**: List of upcoming or newly updated tasks.

### 3. Task Management (`/tasks`)
Central task workspace featuring:
- Multi-field search filters (User, Due Date, Status, Overdue checkbox).
- Task card grid with color-coded status tags.
- "Add Task" modal dialog for Admins & Task Creators.

### 4. User Directory (`/users`)
Team management workspace featuring:
- Member directory grid display (First/Last name, Email, Designation).
- "Add User" modal for Admins to invite and configure permissions.

### 5. Team Messaging (`/messages`)
Collaboration hub featuring:
- Conversation thread list with recent message snippets.
- "Send Message" target user picker modal.
- Active chat drawer modal (`ChatComponent`) for message history.

### 6. Analytics (`/analytics`)
Data visualization screen presenting a **Bar Chart** overview of organization task metrics.

---

## 🔐 Authentication & State Management

Authentication state is managed globally through `AuthProvider.js` via React Context (`AuthContext`):

1. **JWT Storage**: Session tokens are stored in `localStorage` (`jwt`).
2. **Session Verification**: On app launch, `AuthProvider` calls backend GET `/api/v1/check_auth` with `Authorization: Bearer <jwt>` to validate the user.
3. **Protected Navigation**: Unauthenticated requests are redirected to `/login`.
4. **User Metadata**: Local user details (`name`, `client_name`, `admin`, `task_creator`) are stored in `localStorage` (`user`) for UI state scoping.

---

## ⚙️ Environment Variables

The project uses `.env` files for environment configuration:

- `.env.development`:
  ```env
  CI=false
  PORT=3001
  REACT_APP_API_URL=http://localhost:3000
  ```

- `.env.production`:
  ```env
  CI=false
  PORT=3001
  REACT_APP_API_URL=https://sparkv1.scalewithabhi.in
  ```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.x` or `v20.x`
- **npm** or **yarn**

### Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd TaskFlow/taskflow_frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm start
   ```
   The application will automatically launch on [http://localhost:3001](http://localhost:3001).

---

## 📜 Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in development mode at `http://localhost:3001`.
- **`npm run build`**: Bundles the app for production in the `build/` folder and copies `index.html` to `404.html` (for SPA client-side routing compatibility).
- **`npm test`**: Launches the test runner in interactive watch mode.
- **`npm run eject`**: Ejects the underlying Create React App configuration (irreversible).

---

## 📁 Project Architecture & Directory Structure

```
taskflow_frontend/
├── public/                    # Static assets & index.html template
├── src/
│   ├── assets/                # Images & logos (logo.png)
│   ├── components/            # Shared & public components
│   │   ├── AuthLayout.jsx     # Authentication container layout
│   │   ├── Home.jsx           # Public landing page & marketing hero
│   │   ├── Loader.js          # Loading spinner component
│   │   ├── Login.jsx          # Login view
│   │   ├── SignIn.jsx         # Sign-in form component
│   │   └── SignUp.jsx         # Registration form component
│   ├── Dashboard/             # Dashboard modules & layouts
│   │   ├── Analytics.js       # Bar chart task analytics view
│   │   ├── ChatComponent.js   # Chat drawer window
│   │   ├── Dashboard.js       # Main dashboard with pie chart & recent tasks
│   │   ├── Messages.js        # Team messaging inbox
│   │   ├── Page.js            # Dashboard shell (Sidebar + Header layout)
│   │   ├── Tasks.js           # Task management table & add modal
│   │   └── Users.js           # Team member cards & add user modal
│   ├── routes/
│   │   └── AppRoutes.js       # React Router route configuration
│   ├── App.js                 # App wrapper component
│   ├── AuthProvider.js        # React Context authentication provider
│   ├── index.css              # Global styles & Tailwind directives
│   └── index.js               # Application entry point
├── .env.development           # Development environment config
├── .env.production            # Production environment config
├── package.json               # Dependencies & build scripts
├── postcss.config.js          # PostCSS & Tailwind plugin setup
└── tailwind.config.js         # Tailwind CSS theme customization
```

---

## 🌐 Production Build & Deployment

To deploy the frontend app to production hosting (e.g. Vercel, Netlify, Nginx, GitHub Pages):

1. **Run Production Build**:
   ```bash
   npm run build
   ```
2. The generated assets in `build/` are minified and ready for serving.
3. The build script automatically creates a `404.html` fallback file to ensure HTML5 `pushState` routing works smoothly on static web servers.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

