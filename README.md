# CityCare

CityCare is a full-stack civic issue reporting app. Citizens can submit local issues with location details and optional images, while admins can review, filter, and update reports for their assigned region.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Lucide Icons
- Backend: Node.js, Express, Mongoose
- Database: MongoDB
- Auth: JWT-based user/admin login
- Deployment: Docker Compose with Nginx frontend proxy

## Features

- User signup and login
- Role-based user/admin flows
- Report creation with image upload
- User profile and personal report history
- Admin dashboard, report filtering, and status updates
- Dockerized frontend, backend, and MongoDB setup

## Run With Docker

```bash
docker compose up --build
```

Frontend: `http://localhost:3000`

Backend API: `http://localhost:5050/api`

MongoDB: `mongodb://localhost:27017/fixmytown`

## Run Locally

Install frontend dependencies:

```bash
cd frontend
npm install
npm run dev
```

Install backend dependencies:

```bash
cd backend
npm install
npm start
```

For local backend development, keep `backend/.env` configured with:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/fixmytown
JWT_SECRET=yourVerySecretKey123
```
