🏙️ CityCare — Crowdsourced Local Issue Tracker

CityCare is a full-stack civic issue reporting platform that allows citizens to report, track, and manage local problems such as potholes, damaged roads, streetlight failures, sanitation issues, and other community concerns.

The platform provides a role-based system where citizens can submit reports while administrators can view and manage issues relevant to their assigned geographical region.

🔗 Live Demo: https://city-care-chi.vercel.app/
🔗 GitHub: https://github.com/cbum-2023/CityCare

⸻

✨ Features

👤 Citizen Features

* 🔐 User registration and login
* 📝 Report local civic issues
* 📷 Upload images with issue reports
* 📍 Add location/geographical information
* 📊 View submitted reports
* 🔎 Track previously submitted issues
* 🔒 JWT-based authentication

🛡️ Admin Features

* 🔐 Role-based admin authentication
* 📋 View reports submitted by users
* 🌎 Filter reports based on assigned state/area
* 🗂️ Access region-specific civic issues
* 📊 Dedicated admin dashboard
* 🔒 Protected admin routes

⚙️ Backend Features

* RESTful API architecture
* JWT authentication
* Role-based authorization
* Password hashing using bcrypt
* MongoDB database integration
* Image upload handling using Multer
* Modular controllers, routes, models, and middleware
* Environment-variable based configuration

⸻

🛠️ Tech Stack

Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React
* JWT Decode

Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt.js
* Multer
* CORS
* dotenv

⸻

🏗️ Project Architecture

CityCare/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── ...
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md

⸻

🔄 Application Flow

                ┌──────────────────┐
                │      Citizen     │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Register / Login │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │  Report Issue    │
                │  + Image/Location│
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   REST API       │
                │ Node + Express   │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │     MongoDB      │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │      Admin       │
                │     Dashboard    │
                └──────────────────┘

⸻

🔐 Authentication & Authorization

CityCare uses JWT-based authentication to secure user sessions and protected API routes.

The application supports two primary roles:

Role	Access
👤 User	Submit and view personal reports
🛡️ Admin	Access and manage region-specific reports

Passwords are securely hashed using bcrypt.js, while protected routes use JWT-based authorization.

⸻

📍 Regional Filtering

A key feature of CityCare is location-based report filtering.

User accounts and reports contain geographical information such as:

* State
* Area/location

Administrators can use this information to access reports relevant to their assigned region.

This helps prevent administrators from being overwhelmed by unrelated reports from other locations.

⸻

📷 Image Uploads

Users can attach images while reporting civic problems.

The backend handles uploaded files using Multer, allowing issue reports to contain visual evidence of problems such as:

* 🛣️ Potholes
* 💡 Broken streetlights
* 🗑️ Garbage accumulation
* 🚰 Water-related issues
* 🏗️ Damaged public infrastructure

⸻

🚀 Getting Started

1. Clone the Repository

git clone https://github.com/cbum-2023/CityCare.git
cd CityCare

⸻

🖥️ Frontend Setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The Vite development server will provide a local URL, usually:

http://localhost:5173

Production Build

npm run build

⸻

⚙️ Backend Setup

Open another terminal and navigate to the backend:

cd backend

Install dependencies:

npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend:

npm run dev

For production:

npm start

⸻

🌐 Deployment

The frontend is deployed using Vercel.

🔗 Live Application:
https://city-care-chi.vercel.app/

The backend can be deployed independently using platforms such as Render or Railway.

Make sure the frontend API configuration points to the deployed backend URL when running the production application.

⸻

🧪 Development

Frontend

Run the development server:

npm run dev

Run ESLint:

npm run lint

Create production build:

npm run build

Backend

Run with Nodemon:

npm run dev

Run normally:

npm start

⸻

🔮 Future Improvements

Some potential improvements for future versions include:

* 📊 Advanced issue analytics
* 🔄 Issue status tracking
* 📩 Admin-user communication
* 🔔 Email and in-app notifications
* ☁️ Cloud-based image storage using Cloudinary/Firebase Storage
* 🗺️ Interactive map-based issue visualization
* 📱 Mobile-responsive improvements
* 🔎 Advanced issue search and filtering
* 📈 Admin statistics and performance dashboards

⸻

🎯 Why CityCare?

Traditional civic complaint systems can make it difficult for citizens to report local problems and track their progress.

CityCare aims to provide a simple digital platform where:

Citizen
   ↓
Reports Problem
   ↓
Issue Stored & Categorized
   ↓
Relevant Admin Finds Issue
   ↓
Issue Can Be Addressed

This creates a more organized way of connecting citizens with local authorities and managing community issues.

⸻

📚 Key Concepts Demonstrated

This project demonstrates practical experience with:

* Full-stack web development
* MERN stack
* REST API development
* JWT authentication
* Role-based authorization
* Password hashing
* MongoDB & Mongoose
* File uploads
* React routing
* API integration using Axios
* Middleware architecture
* Modular backend architecture
* Geographic filtering
* Frontend-backend integration
* Deployment

⸻

👨‍💻 Author

Shivam Sharma

B.Tech — IIIT Ranchi

Connect

* GitHub: https://github.com/cbum-2023
* Project Repository: https://github.com/cbum-2023/CityCare

⸻

⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub!

CityCare — Making Local Issues Visible.
