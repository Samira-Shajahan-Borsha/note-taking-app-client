# 🔒 SecureNote — Secure Note Taking App Client

SecureNote Frontend is a production-ready web application for the SecureNote platform. It provides a clean, role-based dashboard for managing personal notes, admin controls for platform supervision, and a secure JWT-based authentication flow that talks directly to the SecureNote backend API.

---

## 🎯 Project Overview

SecureNote Client is a modern Next.js application that powers the SecureNote platform's user interface. It enables secure registration, login, note and user management, and role-based access control — all rendered with a fast, accessible, component-driven UI.

Key capabilities:

- Secure authentication flow with JWT access and refresh tokens stored in HTTP-onVly cookies
- Server-side data fetching and server actions for a fast, secure frontend
- Role-based dashboards with dedicated routes and navigation for `USER` and `ADMIN`
- Full notes lifecycle: create, view, update and delete with ownership enforcement
- Admin user management: create, view, update and delete users
- Sortable, filterable, paginated data tables for notes and users
- One-click demo login for quick evaluation

### Supported Roles

- **USER:** Standard consumer account; can log in and manage personal notes.
- **ADMIN:** Platform operator with elevated privileges to create/update/delete users and view all notes across the platform.

---

## 🌐 Live App & Repository

- **Live App:**
  https://note-taking-app-client-omega.vercel.app

- **Client Repository:**
  https://github.com/Samira-Shajahan-Borsha/note-taking-app-client

- **Local Development URL:**
  http://localhost:3000

- **Backend Repository:**
  https://github.com/Samira-Shajahan-Borsha/note-taking-app-server

- **Backend Live API:**
  https://note-taking-app-server.vercel.app/api/v1

---

## 🔑 Test Credentials

### User Accounts

| Role        | Email             | Password       |
| ----------- | ----------------- | -------------- |
| Super Admin | admin@gmail.com   | 12345678@admin |
| User        | samira@gmail.com  | 1234@Samira    |

> **Note:** These are development test credentials mirrored from the backend. They are also available as one-click **Admin Demo** and **User Demo** buttons on the login page.

---

## 🔐 Authentication, Authorization & Security Highlights

SecureNote secures the client with short-lived access tokens and longer-lived refresh tokens. Tokens are issued by the backend, stored in HTTP-only cookies, and enforced through route-level middleware.

Key details:

- **Access & Refresh Tokens:** Login exchanges credentials for access and refresh tokens issued via `Set-Cookie` headers from the backend.
- **Secure Cookie Storage:** Tokens are stored in HTTP-only cookies with `secure` and `sameSite` flags, reducing the XSS attack surface.
- **JWT Verification:** `src/proxy.ts` middleware verifies the access token on every request and extracts the user's role for authorization.
- **Role-Based Route Guarding:** Protected routes are mapped to owners (`USER`, `ADMIN`, or `COMMON`); users are redirected to their default dashboard when access is denied.
- **Auth Route Protection:** Logged-in users visiting `/login` or `/register` are redirected to their default dashboard.
- **Server Actions:** All mutations run through Next.js server actions with server-side Zod validation before calling the backend.
- **Logout:** Clears both access and refresh token cookies to invalidate the client session.

Security best practices implemented:

- HTTP-only, `secure`, `sameSite` cookie flags
- JWT verification on protected routes
- Server-side validation on every action payload

---

## 🧠 Core Features & Screens

### 1️⃣ Landing Page

- Brand navbar with **Sign In** and **Register** actions
- Hero section introducing the secure note-taking experience

### 2️⃣ Authentication

- **Login:** Email/password form with client + server-side Zod validation, plus one-click **Admin Demo** and **User Demo** buttons
- **Register:** Name, email and password form with strict password rules
- Successful login redirects to the role-based default dashboard

### 3️⃣ Dashboard Layout

- Collapsible sidebar with role-based navigation and logout
- Top navbar with breadcrumb, sidebar trigger, and the current user's profile

### 4️⃣ My Notes (User & Admin)

- Create notes via dialog, view note details, edit, and delete
- Data table with sorting, column filtering, column visibility and server-side pagination
- Ownership enforcement — users can only manage their own notes

### 5️⃣ All Notes (Admin)

- View every note created across all users
- Same data-table features as My Notes

### 6️⃣ All Users (Admin)

- Create users via dialog with role selection
- View, edit (name/email/password/role) and delete users
- Paginated, sortable, filterable data table

### 7️⃣ Data Tables

- Powered by TanStack Table with shared, reusable components
- Sorting, column filtering, column visibility toggling and pagination out of the box

---

## 🗺️ Routes Overview

| Route                                   | Access | Description                         |
| --------------------------------------- | ------ | ----------------------------------- |
| `/`                                     | Public | Landing page                        |
| `/login`                                | Public | Sign in (demo buttons included)     |
| `/register`                             | Public | Create a new account                |
| `/dashboard/user/my-notes`              | USER   | The authenticated user's notes      |
| `/dashboard/admin/my-notes`             | ADMIN  | The authenticated admin's notes     |
| `/dashboard/admin/all-notes`            | ADMIN  | All notes across the platform       |
| `/dashboard/admin/all-users`            | ADMIN  | All registered users                |

> All dashboard routes are protected. Unauthenticated users are redirected to `/login` (with a `redirect` query parameter to return them to the intended page after signing in).

---

## 🛠️ Technology Stack

### 🧠 Core & Runtime

- 🚀 **Next.js 16:** App Router, Server Actions, middleware
- ⚛️ **React 19:** UI library with React Compiler enabled
- 🧪 **TypeScript:** Static type checking and compilation

### 🎨 Styling & UI

- 🎨 **Tailwind CSS v4:** Utility-first styling
- 🧩 **shadcn/ui:** Component primitives (dialogs, tables, cards, buttons, sidebar)
- 🖼️ **lucide-react:** Icon library

### 📊 Data Tables

- 🗄️ **TanStack Table:** Headless table with sorting, filtering, visibility and pagination features

### ✅ Forms & Validation

- 📝 **React Hook Form:** Performant form state management
- 🧩 **Zod:** Client and server-side schema validation
- 🔗 **@hookform/resolvers:** Zod resolver integration for React Hook Form

### 🔐 Authentication & Security

- 🔑 **jsonwebtoken:** Client-side JWT verification
- 🍪 **cookie:** Parsing of `Set-Cookie` headers from the backend
- 🛡️ **HTTP-only cookies:** Secure token storage

### 🛠️ Development Tools

- 🧹 **ESLint:** Code linting and quality checks
- 🧠 **TypeScript:** Compile-time type safety
- 📦 **shadcn CLI:** Component generation and management

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- **Git** for version control
- A running instance of the [SecureNote backend](https://github.com/Samira-Shajahan-Borsha/note-taking-app-server) (or access to its live API)

### Clone the Repository

```bash
git clone https://github.com/Samira-Shajahan-Borsha/note-taking-app-client.git
cd note-taking-app-client
```

### Environment Setup

1. **Create the environment file:**

```bash
cp .env.example .env.local
```

> If `.env.example` is not present, create `.env.local` manually.

2. **Configure `.env.local` variables:**

```bash
# JWT secrets must match the backend's secrets
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Backend API base URL
NEXT_PUBLIC_BASE_API_URL=https://note-taking-app-server.vercel.app/api/v1
```

> `JWT_ACCESS_TOKEN_SECRET` and `JWT_REFRESH_TOKEN_SECRET` must be identical to the secrets configured on the backend so the client can verify issued tokens.

### Install Dependencies

```bash
npm install
```

---

## ▶️ Running the Project

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

Create an optimized production build:

```bash
npm run build
```

This generates the `.next/` directory with the compiled application.

### Production Mode

Run the production build locally:

```bash
npm start
```

Ensure `.env.local` is configured with production values before deployment.

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

---

## 📂 Project Structure

```text
note-taking-app-client/
├── public/                        # Static assets
├── src/
│   ├── app/                       # Next.js App Router routes
│   │   ├── (commonLayout)/        # Public layout (login, register)
│   │   │   ├── login/page.tsx     # Login page with demo buttons
│   │   │   └── register/page.tsx  # Registration page
│   │   ├── (dashboardLayout)/     # Protected dashboard layout
│   │   │   ├── layout.tsx         # Sidebar + navbar shell
│   │   │   └── dashboard/
│   │   │       ├── user/my-notes/page.tsx    # User's notes
│   │   │       └── admin/
│   │   │           ├── my-notes/page.tsx     # Admin's own notes
│   │   │           ├── all-notes/page.tsx    # All notes (admin)
│   │   │           └── all-users/page.tsx    # All users (admin)
│   │   ├── layout.tsx             # Root layout & fonts
│   │   ├── globals.css            # Global styles & Tailwind
│   │   └── page.tsx               # Landing page
│   ├── components/
│   │   ├── ui/                    # shadcn/ui primitives
│   │   ├── data-table/            # Reusable table components
│   │   └── modules/               # Feature components
│   │       ├── Dashboard/         # Sidebar & navbar
│   │       ├── Notes/             # Notes views, columns & dialogs
│   │       └── Users/             # Users views, columns & dialogs
│   ├── lib/
│   │   ├── auth-utils.ts          # Role & route ownership helpers
│   │   ├── server-fetch.ts        # Backend fetch wrapper with cookies
│   │   ├── zodValidator.ts        # Zod safeParse helper
│   │   ├── utils.ts               # cn() helper
│   │   └── data-table-features.ts # TanStack table feature config
│   ├── services/
│   │   ├── auth/                  # Login/register/logout actions & token handlers
│   │   ├── note/                  # Note server actions
│   │   └── user/                  # User server actions
│   ├── types/                     # Shared TypeScript interfaces
│   └── zod/                       # Zod validation schemas
├── proxy.ts                       # Middleware for auth & role-based guarding
├── next.config.ts                 # Next.js configuration
├── components.json                # shadcn/ui configuration
├── postcss.config.mjs             # PostCSS / Tailwind v4 configuration
├── eslint.config.mjs              # ESLint configuration
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

---

## 🔗 Backend Integration

The client depends on the [SecureNote backend](https://github.com/Samira-Shajahan-Borsha/note-taking-app-server) for authentication, notes and user management.

- All API calls go through `src/lib/server-fetch.ts`, which attaches the stored access token cookie to each request.
- The backend base URL is configured via `NEXT_PUBLIC_BASE_API_URL`.
- Login reads the `Set-Cookie` headers returned by the backend, stores the tokens client-side, and verifies the access token to determine the user's role for routing.