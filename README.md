# ScholarSync

ScholarSync is a full-stack Learning Management System (LMS) with separate student and instructor experiences.  
It includes authentication, course management, assignments, submissions, grading, library resources, and role-based dashboards.

---

## Features

- **Role-based authentication**
  - Student signup/login
  - Instructor signup/login
  - Authenticated profile endpoint (`/auth/me`)
- **Student workflows**
  - Browse/search/filter courses
  - Enroll in courses
  - Track module completion progress
  - View assignments and submission status
  - Submit assignment work
  - View grades and GPA
  - Browse/search library resources
  - Save resources and track reading progress
  - Student dashboard with upcoming assignments and recent grades
- **Instructor workflows**
  - Create/update/delete courses
  - Add modules and announcements to courses
  - Create/update/delete assignments
  - View submissions
  - Grade submissions
  - Create library resources
  - Instructor dashboard with teaching stats
- **Backend protections**
  - JWT authentication
  - Role-based authorization middleware
  - API rate limiting
  - Centralized error handling
- **Design artifacts**
  - System/UML documentation available in `diagrams/`

---

## Tech Stack

### Frontend (`client/`)
- React 19
- Vite
- React Router
- Axios
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion
- Lucide React

### Backend (`server/`)
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- Validation library (`zod`)
- CORS + Express Rate Limit

### Tooling
- ESLint (frontend)
- TypeScript compiler (`tsc`) (backend)

---

## Project Structure (tree)

```text
Scholar-Sync/
├── client/
│   ├── src/
│   │   ├── api/                # Frontend API wrappers (auth, courses, assignments, etc.)
│   │   ├── components/         # Shared UI components and route guards
│   │   ├── context/            # Auth context
│   │   ├── layouts/            # Public/student/instructor layouts
│   │   ├── pages/              # Student + public pages
│   │   └── pages/instructor/   # Instructor pages
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── config/             # DB connection
│   │   ├── controllers/        # Route handlers/business logic
│   │   ├── middleware/         # Auth, RBAC, error handling
│   │   ├── models/             # Mongoose models
│   │   ├── routes/             # API route definitions
│   │   ├── seed/               # Database seeding script
│   │   ├── utils/              # JWT utils
│   │   ├── app.ts              # Express app configuration
│   │   └── server.ts           # Server bootstrap
│   ├── package.json
│   ├── tsconfig.json
│   └── vercel.json
├── diagrams/                   # System design/UML documentation
└── package-lock.json
```

---

## Architecture Overview

ScholarSync follows a client-server architecture:

1. **React client** renders role-specific UI and calls API modules in `client/src/api/*`.
2. **Axios client** attaches JWT from local storage and handles unauthorized responses.
3. **Express API** exposes REST endpoints under `/api/*`.
4. **Middleware pipeline** applies CORS, JSON parsing, rate limiting, authentication, and role checks.
5. **Controllers** implement business logic.
6. **Mongoose models** persist data in MongoDB.

```text
React (Vite) → Axios API client → Express routes → Middleware (auth/RBAC) → Controllers → Mongoose → MongoDB
```

---

## Installation

### Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB instance (local or Atlas)

### 1) Clone and install dependencies

```bash
git clone <your-repo-url>
cd Scholar-Sync

cd server
npm install

cd ../client
npm install
```

### 2) Configure environment variables

Create env files as described below.

### 3) Run backend and frontend

Use separate terminals:

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

---

## Environment Variables

### Server (`server/.env`)

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=7d
PORT=5001
CLIENT_URL=http://localhost:5173
```

> Notes:
> - `MONGODB_URI` is required by `server/src/config/db.ts`.
> - `PORT` defaults to `5000` if not set.
> - `CLIENT_URL` is used by CORS.
> - `JWT_SECRET` has a fallback in code, but set it explicitly for real use.

### Client (`client/.env`)

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

If omitted, the client defaults to `/api`.

---

## Usage

- Open frontend at `http://localhost:5173`
- API health check: `GET /api/health`
- Seed demo data (optional):

```bash
cd server
npm run seed
```

Seed script prints sample credentials in console (student + instructor).

---

## Scripts / Commands

### Client (`client/package.json`)

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview built app
- `npm run lint` — run ESLint

### Server (`server/package.json`)

- `npm run dev` — start API with `ts-node-dev`
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run compiled server
- `npm run seed` — seed database

---

## API Endpoints

Base URL: `/api`

### Health
- `GET /health`

### Auth
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/instructor/signup`
- `POST /auth/instructor/login`
- `GET /auth/me` (auth required)

### Courses
- `GET /courses` (auth)
- `GET /courses/instructor/mine` (instructor)
- `GET /courses/:idOrSlug` (auth)
- `POST /courses` (instructor)
- `PUT /courses/:id` (instructor)
- `DELETE /courses/:id` (instructor)
- `POST /courses/:id/modules` (instructor)
- `POST /courses/:id/announcements` (instructor)

### Enrollments
- `GET /enrollments` (student)
- `POST /enrollments` (student)
- `PUT /enrollments/:id/module-complete` (student)

### Assignments
- `GET /assignments` (auth)
- `GET /assignments/:idOrSlug` (auth)
- `POST /assignments` (instructor)
- `PUT /assignments/:id` (instructor)
- `DELETE /assignments/:id` (instructor)

### Submissions
- `POST /submissions` (student)
- `GET /submissions` (instructor)
- `GET /submissions/my` (student)

### Grades
- `GET /grades` (student)
- `GET /grades/gpa` (student)
- `POST /grades` (instructor)

### Library
- `GET /library` (auth)
- `GET /library/recent` (student)
- `GET /library/saved` (student)
- `POST /library/saved` (student)
- `PUT /library/progress` (student)
- `GET /library/:idOrSlug` (auth)
- `POST /library` (instructor)

### Dashboard
- `GET /dashboard/overview` (student)
- `GET /dashboard/instructor` (instructor)

---

## Deployment

### Backend

`server/vercel.json` is configured for Vercel Node deployment using `src/app.ts`.

### Frontend

Frontend is a Vite app and can be deployed to any static host (Vercel/Netlify/etc.) after `npm run build`.

When deploying, ensure:
- Client API base URL points to deployed backend (`VITE_API_BASE_URL`)
- Server CORS `CLIENT_URL` matches deployed frontend origin

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Make changes in `client/` and/or `server/`
4. Run lint/build locally
5. Open a pull request with clear scope and test notes

---

## License

No `LICENSE` file was detected in the repository.  
Add a license file (for example, MIT) if you want explicit open-source usage terms.

---

## Known Issues / Roadmap

### Detectable issues
- `client/vite.config.js` proxies `/api` to `http://localhost:5001`, while backend defaults to port `5000` unless `PORT` is set. Configure `PORT=5001` (or update proxy/env) to avoid local mismatch.

### Roadmap signals
- No explicit roadmap/TODO/FIXME markers were detected in source files.
