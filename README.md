
---

# MEN-Stack Auth & Profile Template (TypeScript)

A production-ready, security-focused backend boilerplate using **Node.js, Express, and MongoDB Atlas**. This template implements a robust Authentication and User Management system with the **MVC (Model-View-Controller)** pattern.

## Features

* **Secure Authentication**: JWT-based auth with Access & Refresh token rotation.
* **Comprehensive Profile Management**: Get profile, update info, change password, and account deletion.
* **Validation Layer**: Strict input validation using **Zod**.
* **Security First**: Password hashing (bcrypt), HTTP-only cookies for tokens, and protected route middleware.
* **Logging & Monitoring**: HTTP request logging with **Morgan** and system logging with **Winston**.
* **Centralized Error Handling**: Custom error middleware for consistent API responses.

---

## Tech Stack

* **Runtime**: Node.js & TypeScript
* **Framework**: Express.js
* **Database**: MongoDB Atlas via Mongoose
* **Validation**: Zod
* **Auth**: JWT (jsonwebtoken)
* **Logging**: Winston + Morgan

---

## Project Structure

```text
src/
├── config/             # DB and Environment configurations
├── controllers/        # Request handlers (logic for Auth & User)
├── middleware/         # Auth guard, Error handler, Zod validator
├── models/             # Mongoose schemas (User, RefreshToken)
├── routes/             # API route definitions
├── services/           # Business logic (DB queries, Password hashing)
├── utils/              # Zod schemas, Loggers, JWT helpers
├── app.ts              # Express app setup
└── server.ts           # Entry point

```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login & receive tokens | No |
| `POST` | `/api/auth/refresh` | Refresh expired access token | Yes (Cookie) |
| `POST` | `/api/auth/logout` | Clear tokens & logout | Yes |

### User Profile

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `GET` | `/api/user/me` | Get current user data | Yes |
| `PATCH` | `/api/user/update` | Update profile info | Yes |
| `POST` | `/api/user/change-password` | Update user password | Yes |
| `DELETE` | `/api/user/delete` | Remove user account | Yes |

---

## Setup & Installation

1. **Clone the repository**
2. **Install dependencies**
```bash
npm install

```


3. **Environment Variables** Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
NODE_ENV=development

```


4. **Run Development Server**
```bash
npm run dev

```



---

## Security Implementation

* **Password Hashing**: Uses `mongoose` pre-save hooks to hash passwords before storage.
* **Validation**: Every request body is validated against a **Zod Schema** before hitting the controller.
* **JWT Rotation**: Refresh tokens are stored securely to maintain sessions without compromising security.

---

**Would you like me to add a section on how to specifically use the Winston logger for debugging your new endpoints?**