## 🚀 SwiftMatch-MERN

    A high-performance, full-stack networking platform designed for developers to connect,
    collaborate, and build. Built using the
    MERN Stack (MongoDB, Express.js, React, Node.js), 
    wiftMatch features a robust authentication system and an
    intelligent connection request logic.

## 🌟 Key Features

    ➡️ Secure Authentication: JWT-based authentication with secure cookie handling.
    ➡️ Dynamic Matching: Discover developers based on skills and interests.
    ➡️ Connection Logic: Real-time request system (Send, Accept, Ignore, or Reject).
    ➡️ Profile Management: Comprehensive profile editing including bio, skills, age, and profile pictures.
    ➡️ Responsive UI: Fully optimized for mobile, tablet, and desktop views.

## 🛠️ Tech Stack
    
    ⭐️ Frontend (SwiftMatch-web)
        • Framework: React.js (Vite)
        • State Management: Redux Toolkit
        • Styling: Tailwind CSS & DaisyUI
        • Icons: Lucide React / FontAwesome
    
    ⭐️ Backend (SwiftMatch)
       • Runtime: Node.js
       • Framework: Express.js

    ⭐️ Database: MongoDB (Mongoose ODM)

    ⭐️ Security: Bcrypt (Password hashing), JWT (Authorization)

## 📁 Project Structure

```text
SwiftMatch-MERN/
├── SwiftMatch-web/        # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   └── package.json
├── SwiftMatch/            # Backend (Node + Express)
│   ├── src/
│   │   ├── models/        # Database Schemas
│   │   ├── routes/        # API Endpoints
│   │   ├── middlewares/   # Auth & Validation
│   │   └── utils/         # Helper functions
│   └── package.json
└── README.md
```

## 📡API Endpoints

```text
  Authentication
         Method   Endpoint   Description
         POST     /signup    Register a new developer account
         POST     /login     Authenticate user & receive JWT cookie
         POST     /logout    Clear session and logout

  Profile Management
         Method   Endpoint            Description
         GET      /profile/view       Get current logged-in user details
         PATCH    /profile/edit       Update profile information (skills, bio, etc.)
         PATCH    /profile/password   Update account password

  Connection Requests
         Method   Endpoint                      Description
         POST     /request/send/:status/:id     Send interested or ignored request
         POST     /request/review/:status/:id   accept or reject an incoming request
```
