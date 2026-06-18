# DevFolio Backend API Server ⚙️📡

This repository contains the backend engine for **DevFolio**, built with **Node.js**, **Express.js**, **MongoDB/Mongoose**, and integrated with **Cloudinary** for image CDN storage. 

It provides authentication, OTP-based password recovery, session validation, CRUD management of portfolios, and public portfolio retrieval.

---

## 🚀 Key Features

* **JWT-Based Authentication**: Secure signup, login, and logout flows with token cookies.
* **OTP Password Recovery**: Complete password reset cycle via email notifications and validation OTP codes.
* **Dynamic Portfolio Engine**: Handles specialized endpoint routers for managing profile information sections (bio, about me, social links).
* **Skills CRUD Endpoints**: Add, update, and delete tags in the user's skill stack array.
* **Projects CRUD & Media Upload**: Processes project uploads, tags, category classifications, and links. Integrates **Multer** and the **Cloudinary SDK** to host project covers and profile avatars on a global CDN.
* **Public Portfolio API**: Serves public portfolio details by username (without authentication), supporting dynamic live page rendering.
* **Secure CORS Handling**: Configured with credentials support for HTTP-only cookie validation between origins.
* **Serverless Compatibility**: Optimized to run on serverless environments (like Vercel) by utilizing OS temporary directories for multer file buffering.

---

## 📡 API Endpoints Reference

### 🔐 Authentication Router (`/api/auth`)
* `POST /api/auth/register` - Create a new user account.
* `POST /api/auth/login` - Authenticate credentials and store JWT token in cookie.
* `POST /api/auth/logout` - Clear JWT authentication token.
* `POST /api/auth/send-reset-otp` - Send a 6-digit OTP code to the registered email address for password reset.
* `POST /api/auth/reset-password` - Validate OTP and update user password.

### 👤 User Router (`/api/user`)
* `GET /api/user/data` - Retrieve logged-in user context.

### 💼 Portfolio Router (`/api/portfolio`)
* `GET /api/portfolio/me` - Fetch logged-in user's portfolio.
* `GET /api/portfolio/username/:username` - Public endpoint to retrieve portfolio data by username.
* `PUT /api/portfolio/personal-info` - Update name, role, bio, and upload avatar (`image` field).
* `PUT /api/portfolio/about` - Update detailed about description text.
* `PUT /api/portfolio/social-links` - Update WhatsApp, LinkedIn, GitHub, and email links.
* `POST /api/portfolio/skills` - Add a new skill to stack.
* `PUT /api/portfolio/skills/:oldSkill` - Update an existing skill name.
* `DELETE /api/portfolio/skills/:skillName` - Remove a skill from stack.
* `POST /api/portfolio/projects` - Add a project with description, links, tags, category, and cover upload.
* `PUT /api/portfolio/projects/:projectId` - Update project details, category, and optionally replace cover.
* `DELETE /api/portfolio/projects/:projectId` - Remove a project from portfolio list.

---

## 🛠️ Technology Stack

* **Runtime Environment**: Node.js (v18+)
* **Web Framework**: Express.js
* **Database**: MongoDB (Mongoose ODM layer)
* **Storage & CDN**: Cloudinary SDK (via local multer buffer storage in `os.tmpdir()`)
* **Security & Tokens**: JWT (JSON Web Tokens) & BcryptJS (password hashing)
* **Parsers**: Cookie-parser & Body-parser (JSON / urlencoded)
* **Mailing Service**: Nodemailer (for OTP dispatch)

---

## ⚙️ Config & Setup

### 1. Configure Environment Variables
Create a `.env` file in the root of the `Server` directory:

```bash
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google OAuth Credentials (for Nodemailer OTP service)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_USER=your_gmail_address
```

### 2. Install Dependencies
Run this command in the `Server` folder:
```bash
npm install
```

### 3. Run Development Server
Start the Express server with Nodemon (for hot reloading):
```bash
npm run dev
```
The server will run on `http://localhost:3000`.

---

## 🌐 Production & Vercel Deployment

This project contains configuration for deploying as a serverless function on **Vercel**:

* **Vercel Serverless Function (`vercel.json`)**: Configured to package `server.js` using the `@vercel/node` builder and route all HTTP requests to it.
* **Serverless Compatibility**: Express app is exported as default, and local folders destination in multer is resolved to `os.tmpdir()` to prevent writes crashing in the read-only file systems of serverless execution containers.

---

## 📂 Project Structure

```text
Server/
├── src/
│   ├── config/             # Config variables loader
│   ├── controllers/        # Request handlers (auth, user, portfolio logic)
│   ├── middlewares/        # Middlewares (auth validation, multer uploader)
│   ├── models/             # Mongoose Schemas (User, Portfolio)
│   ├── routes/             # Express Routers
│   ├── utils/              # Helper utilities (Cloudinary wrapper, email dispatchers)
│   └── app.js              # Express app initialization
├── server.js               # Entry point port listener (exports app for production)
├── vercel.json             # Vercel deployment routes and builds
└── package.json            # Scripts and packages list
```

---

## 📄 License
This project is licensed under the MIT License.
