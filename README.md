# 🧠 Hotel Backend API (Express.js)

A secure and modular RESTful API built with **Express.js** for managing a hotel system.  
This backend includes user authentication, blog and gallery management, contact messages, reservations, and reviews — all protected with JWT and custom middleware.

---

## 🚀 Features

- 🔐 **JWT Authentication**
- 🔁 **Reusable Middleware (`identifier`)** to protect private routes
- 📚 Blog management (create, edit, delete, upload image)
- 🖼️ Gallery system (upload & delete images)
- 📩 Contact form message handling
- 🛏️ Reservation system with admin access
- 🌟 Review system with delete access control
- 📦 Multer middleware for file uploads

---

## 📁 API Structure

### 🔐 Auth (`/api/auth`)
| Endpoint             | Method | Auth Required | Description                       |
|----------------------|--------|----------------|-----------------------------------|
| `/signin`            | POST   | ❌             | Sign in and receive JWT           |
| `/signout`           | POST   | ✅             | Sign out (invalidate token logic) |
| `/test`              | POST   | ✅             | Test token and get user payload   |
| `/check`             | GET    | ✅             | Check if token is valid           |

---

### 📚 Blog (`/api/blog`)
| Endpoint                 | Method | Auth | Description                      |
|--------------------------|--------|------|----------------------------------|
| `/all-blogs`             | GET    | ❌   | Get all blogs                    |
| `/get-blog`              | POST   | ❌   | Get one blog by title            |
| `/create-blog`           | POST   | ✅   | Create a new blog post           |
| `/edit-blog`             | PATCH  | ✅   | Edit blog (with new image)       |
| `/edit-blog-no-file`     | PATCH  | ✅   | Edit blog (keep existing image)  |
| `/delete-blog`           | DELETE | ✅   | Delete a blog                    |

---

### 🖼️ Gallery (`/api/gallery`)
| Endpoint           | Method | Auth | Description              |
|--------------------|--------|------|--------------------------|
| `/all-gallery`     | GET    | ❌   | Get all gallery images   |
| `/create-gallery`  | POST   | ✅   | Upload new image         |
| `/delete-gallery`  | DELETE | ✅   | Delete image by ID       |

---

### 📩 Contact (`/api/contact`)
| Endpoint          | Method | Auth | Description                     |
|-------------------|--------|------|---------------------------------|
| `/all-contacts`   | GET    | ✅   | Get all contact form messages   |
| `/create-contact` | POST   | ❌   | Send a new contact message      |

---

### 🛏️ Reservation (`/api/reserv`)
| Endpoint         | Method | Auth | Description                    |
|------------------|--------|------|--------------------------------|
| `/all-reserv`    | GET    | ✅   | View all reservations          |
| `/create-reserv` | POST   | ❌   | Submit a new reservation       |
| `/delete-reserv` | DELETE | ✅   | Delete a reservation by ID     |

---

### 🌟 Review (`/api/review`)
| Endpoint           | Method | Auth | Description                  |
|--------------------|--------|------|------------------------------|
| `/all-reviews`     | GET    | ❌   | Get all customer reviews     |
| `/create-review`   | POST   | ❌   | Submit a new review          |
| `/delete-review`   | DELETE | ✅   | Delete a review (admin only) |

---

## 🔐 Middleware: `identifier`

Custom middleware used to:
- Validate JWT token
- Attach user info to `req.user`
- Restrict access to protected routes

---

## 🧰 Technologies Used

- **Express.js**
- **JWT (jsonwebtoken)**
- **Multer** for file uploads
- **MongoDB & Mongoose**
- **CORS**
- **Dotenv**
- **Modular Routing Structure**

---

## 📦 Installation

```bash
git clone https://github.com/fratsaislam/HSR-backend
cd HSR-backend
npm install
