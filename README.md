# DevFolio Backend API Server ⚙️📡

This repository contains the backend engine for **DevFolio**, built with **Node.js**, **Express.js**, **MongoDB/Mongoose**, and integrated with **Cloudinary** for image CDN storage. 

It provides authentication, session validation, CRUD management of portfolios, and public portfolio retrieval.

---

## 🚀 Key Features

* **JWT-Based Authentication**: Secure signup, login, and logout flows with token cookies.
* **Dynamic Portfolio Engine**: Handles specialized endpoint routers for managing profile information sections (bio, about me, social links).
* **Skills CRUD Endpoints**: Add, update, and delete tags in the user's skill stack array.
* **Projects CRUD & Media Upload**: Processes project uploads, tags, and links. Integrates **Multer** and the **Cloudinary SDK** to host project covers and profile avatars on a global CDN.
* **Public Portfolio API**: Serves public portfolio details by username (without authentication), supporting dynamic live page rendering.
* **Secure CORS Handling**: Configured with credentials support for HTTP-only cookie validation between origins.

---

## 📡 API Endpoints Reference

### 🔐 Authentication Router (`/api/auth`)
* `POST /api/auth/register` - Create a new user account.
* `POST /api/auth/login` - Authenticate credentials and store JWT token in cookie.
* `POST /api/auth/logout` - Clear JWT authentication token.

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
* `POST /api/portfolio/projects` - Add a project with description, links, tags, and cover upload.
* `PUT /api/portfolio/projects/:projectId` - Update project details and optionally replace cover.
* `DELETE /api/portfolio/projects/:projectId` - Remove a project from portfolio list.

---

## 🛠️ Technology Stack

* **Runtime Environment**: Node.js (v18+)
* **Web Framework**: Express.js
* **Database**: MongoDB (Mongoose ODM layer)
* **Storage & CDN**: Cloudinary SDK (via local multer buffer storage)
* **Security & Tokens**: JWT (JSON Web Tokens) & BcryptJS (password hashing)
* **Parsers**: Cookie-parser & Body-parser (JSON / urlencoded)

---

## ⚙️ Config & Setup

### 1. Configure Environment Variables
Create a `.env` file in the root of the `Server` directory:

```bash
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
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

## 📂 Project Structure

```text
Server/
├── public/                 # Static directories
│   └── temp/               # Temporary uploads directory (cleaned up automatically)
├── src/
│   ├── config/             # Config variables loader
│   ├── controllers/        # Request handlers (auth, user, portfolio logic)
│   ├── middlewares/        # Middlewares (auth validation, multer uploader)
│   ├── models/             # Mongoose Schemas (User, Portfolio)
│   ├── routes/             # Express Routers
│   ├── utils/              # Helper utilities (Cloudinary wrapper)
│   └── app.js              # Express app initialization
├── server.js               # Entry point port listener
└── package.json            # Scripts and packages list
```

---

## 📄 License
This project is licensed under the MIT License.
