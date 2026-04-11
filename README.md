# BuildBot X AI Studio

BuildBot X AI Studio is a full-stack AI website builder where users describe what they want in plain English and get generated web app code with live preview.

## Overview

This project includes:

- Secure authentication (login and signup)
- Project management dashboard
- AI-powered code generation using Google Gemini
- Chat-driven builder workflow
- Live preview + code editor + download
- Premium dark violet and gold SaaS-style UI
- Subscription pricing section on landing page
- Profile drawer with account details

## Tech Stack

### Frontend

- React 19
- React Router
- Axios
- Vite

### Backend

- Node.js
- Express 5
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing
- Google Gemini SDK

## Project Structure

- client: React frontend application
- server: Express backend API

## Features

### Authentication

- Login and signup flow
- Form validation
- Session persistence
- Local fallback session support if backend is unavailable

### Landing Page

- Prompt input to start generating apps
- Feature highlights
- Subscription pricing cards
- Monthly and yearly pricing toggle

### User Account UI

- Avatar in navbar
- Slide-in profile drawer
- User name, email, and subscription status
- Settings and logout actions

### Builder Experience

- Prompt-based AI generation
- Chat history
- Live preview iframe
- Code editor tab
- Download generated HTML

## Environment Variables

Create server environment file from the example:

1. Copy server/.env.example to server/.env
2. Update values in server/.env

Required values:

- PORT
- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRES_IN
- GEMINI_API_KEY
- CLIENT_URL

## Local Development

### 1) Install dependencies

From the project root:

- Install server dependencies:

```bash
cd server
npm install
```

- Install client dependencies:

```bash
cd ../client
npm install
```

### 2) Run backend

```bash
cd server
npm start
```

Backend runs on http://localhost:5000 by default.

### 3) Run frontend

In a new terminal:

```bash
cd client
npm run dev
```

Frontend runs on http://localhost:5173 (or next available port).

## Available Scripts

### Server

- npm start: Start server
- npm run dev: Start server in watch mode

### Client

- npm run dev: Start Vite dev server
- npm run build: Build for production
- npm run preview: Preview production build

## API Routes

Base API prefix: /api

### Auth

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/auth/logout

### Projects

- GET /api/projects
- POST /api/projects
- GET /api/projects/:id
- PUT /api/projects/:id
- DELETE /api/projects/:id

### Generation

- POST /api/generate/:projectId

## Notes

- Keep server/.env private and never commit secrets.
- The project includes a .gitignore to exclude sensitive and generated files.
- If port 5173 is in use, Vite automatically uses another port.

## License

This project is provided for learning and development purposes.
