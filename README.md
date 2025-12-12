# Electronic Shop POS System - Backend

This is the **backend** of the Electronic Shop POS System. It provides a secure and scalable API for managing products, orders, customers, and payments. Built with **Node.js, Express.js, and MongoDB/PostgreSQL**, it serves as the backbone for the frontend POS dashboard and web app.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

---

## Features

- **User Authentication & Authorization**: JWT-based auth, role-based access (Admin, Staff, Cashier).
- **Product Management**: CRUD operations for products, with stock management.
- **Order Management**: Create, update, and track customer orders.
- **Payment Handling**: Automatic calculation of total, payment, and change amount.
- **Reporting**: Sales reports, daily revenue, stock levels, and analytics.
- **Secure & Scalable**: Designed for production-ready deployment.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **ORM/ODM**: Mongoose (for MongoDB) / Prisma (for PostgreSQL)
- **File Storage**: Cloudinary (for product images, optional)
- **Payment Integration**: Stripe (optional)
- **Validation**: Joi / express-validator

---

## Installation

### Prerequisites

- Node.js >= 18
- npm / yarn
- MongoDB or PostgreSQL instance

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/electronic-shop-pos-backend.git
cd electronic-shop-pos-backend
Install dependencies

bash
Copy code
npm install
# or
yarn install
Set up environment variables
Create a .env file in the root and add your configuration:

ini
Copy code
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret
Run the server

bash
Copy code
npm run dev
# or
yarn dev
The backend will run on http://localhost:5000.

API Endpoints
Authentication

POST /api/user/register – Register a new user
POST /api/auth/login – Login user and return JWT
GET /api/auth/me – Get current user info

Products

POST /api/product/create-product – Create a new product
GET /api/product/all-product – Get all products
GET /api/product/:id – Get a single product
GET /api/product/low-stock – Get a low stock product
PUT /api/product/:id – Update product
DELETE /api/product/:id – Delete product



sell product

POST /api/sell/sell-product – Add a new order
GET /api/sell/all-sell – Get all order



Project Structure

Copy code
backend/
│
├─ controllers/      # Business logic for routes
├─ models/           # Database models (Mongoose/Prisma)
├─ routes/           # API routes
├─ middlewares/      # Auth, validation, error handling
├─ utils/            # Helper functions
├─ server.js         # Entry point
├─ package.json
└─ README.md
```
