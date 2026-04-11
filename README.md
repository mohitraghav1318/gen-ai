# HIKARI_CV - AI Interview Strategy Generator

HIKARI_CV is a full-stack application that helps users prepare for interviews by generating:
- role-specific technical and behavioral questions,
- skill-gap insights with severity,
- a day-wise preparation roadmap,
- and a downloadable ATS-friendly resume PDF.

The project is split into:
- `Frontend/` (React + Vite)
- `Backend/` (Node.js + Express + MongoDB + Google GenAI)

## 1. Architecture Overview

### Frontend
- React app with `createBrowserRouter` route configuration.
- Session bootstrap via `GET /api/auth/get-me` on app load.
- Route protection using a `Protected` wrapper.
- Interview state managed with `InterviewContext` and `useInterview()`.

### Backend
- Express API mounted under:
  - `/api/auth`
  - `/api/interview`
- Cookie-based authentication using JWT.
- Blacklisted-token logout strategy.
- Resume PDF parsing (`pdf-parse`) and PDF generation (`puppeteer`).
- AI report and resume generation via Google GenAI.

## 2. Frontend Routes and Flow

| Route | Access | Component | Purpose |
|---|---|---|---|
| `/login` | Public | `Login` | Authenticate existing user |
| `/register` | Public | `Register` | Create account |
| `/` | Protected | `AppLayout` + `Home` | Generate report + list previous reports |
| `/interview/:interviewId` | Protected | `AppLayout` + `Interview` | View detailed interview report |
| `/contact` | Protected | `AppLayout` + `Contact` | Support/contact details |
| `/about` | Protected | `AppLayout` + `About` | Product overview |
| `/settings` | Protected | `AppLayout` + `Settings` | Preference summary UI |

### Frontend Route Linking

1. App boot:
   - `AuthProvider` calls `getMe()`.
   - If user exists, protected routes render.
   - If not, protected routes redirect to `/login`.

2. Auth flow:
   - `/register` -> successful register -> user stored in context -> navigate to `/`.
   - `/login` -> successful login -> user stored in context -> navigate to `/`.

3. Home to Interview flow:
   - On `/`, `useInterview()` fetches all reports.
   - User submits job description + resume/self description.
   - App calls report-generation API and receives `interviewReport._id`.
   - App navigates to `/interview/:interviewId`.

4. Interview details flow:
   - `/interview/:interviewId` fetches full report by ID.
   - User can switch sections (Technical, Behavioral, Road Map) in-page.
   - "Download Resume" triggers PDF endpoint and downloads a generated file.

## 3. Backend API Routes and Flow

Base URL (local): `http://localhost:3000`

### Auth Routes (`/api/auth`)

| Method | Endpoint | Auth Required | Purpose |
|---|---|---|---|
| `POST` | `/register` | No | Register a new user and set auth cookie |
| `POST` | `/login` | No | Login and set auth cookie |
| `GET` | `/logout` | No | Clear cookie and blacklist token |
| `GET` | `/get-me` | No | Return current user or `user: null` |

### Interview Routes (`/api/interview`)

| Method | Endpoint | Auth Required | Purpose |
|---|---|---|---|
| `POST` | `/` | Yes | Generate and store interview report |
| `GET` | `/` | Yes | List current user interview reports (summary) |
| `GET` | `/report/:interviewId` | Yes | Get one full interview report |
| `POST` | `/resume/pdf/:interviewReportId` | Yes | Generate resume PDF from report data |

### API Flow Linking

1. `POST /api/interview/`
   - `authUser` middleware verifies JWT from cookie.
   - `multer` parses optional resume PDF (`resume`, max 5MB).
   - Controller validates inputs.
   - Resume text is extracted (if PDF provided).
   - AI service generates interview strategy.
   - Report is stored in MongoDB.
   - Frontend redirects to `/interview/:id`.

2. `GET /api/interview/report/:interviewId`
   - Authenticated user fetches their own report.
   - Used by Interview page for full-detail view.

3. `POST /api/interview/resume/pdf/:interviewReportId`
   - Uses stored report data to generate HTML resume through AI.
   - Converts HTML to PDF via Puppeteer.
   - Returns downloadable PDF blob to frontend.

## 4. Installation and Setup

### Prerequisites
- Node.js 20+ recommended
- npm
- MongoDB connection string
- Google GenAI API key

### Clone and Install

```bash
git clone <repo-url>
cd hikaricv
```

Install backend dependencies:

```bash
cd Backend
npm install
```

Install frontend dependencies:

```bash
cd ../Frontend
npm install
```

### Environment Variables

Create `Backend/.env`:

```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
GOOGLE_GENAI_API_KEY=<your_google_genai_api_key>
```

## 5. Run the Project

Start backend (port `3000`):

```bash
cd Backend
npm run dev
```

Start frontend (Vite default `5173`):

```bash
cd Frontend
npm run dev
```

Open: `http://localhost:5173`

Important:
- Backend CORS is configured for `http://localhost:5173`.
- Frontend API clients use `withCredentials: true`; keep backend/frontend on these origins unless you update CORS and API base URLs.

## 6. Usage Guide

1. Register a new account at `/register` or login at `/login`.
2. On `/`, paste a job description and either:
   - upload a PDF resume, or
   - enter self-description text.
3. Click **Generate My Interview Strategy**.
4. Review report at `/interview/:interviewId`.
5. Download optimized resume PDF from the Interview page.
6. Revisit previous reports from the Home page "My Recent Interview Plans" list.

## 7. Project Structure

```text
interview-ai-yt/
├── Backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── server.js
└── Frontend/
    ├── src/
    │   ├── app.routes.jsx
    │   ├── components/
    │   └── features/
    └── vite.config.js
```

## 8. Available Scripts

### Backend (`Backend/package.json`)
- `npm run dev` - run backend with nodemon

### Frontend (`Frontend/package.json`)
- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

## 9. Notes

- Authentication is cookie-based JWT, not bearer-token headers.
- Logout blacklists the token to invalidate existing session cookies.
- `GET /api/auth/get-me` is intentionally non-401 for no-session cases and returns `user: null`.
