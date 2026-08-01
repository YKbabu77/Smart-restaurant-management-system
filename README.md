# 🍽️ Smart Restaurant Pre-Order & Pickup Management System

A full-stack restaurant management web application that allows customers to browse the menu, place pickup orders, and track their orders, while providing administrators with a dashboard to manage foods, categories, customers, and orders.

🌐 **Live Website:** https://restaurant-management-system-xi-five.vercel.app

---

## 📖 Project Overview

The **Smart Restaurant Pre-Order & Pickup Management System** is designed to simplify restaurant operations by enabling customers to pre-order food for pickup and allowing administrators to efficiently manage restaurant data through a dedicated admin panel.

This project was developed using **React.js**, **Spring Boot**, and **MySQL** following a REST API architecture.

---

## ✨ Features

### 👤 Customer Features

- User Registration
- User Login
- Browse Food Menu
- Search Food Items
- Filter Foods by Category
- View Food Details
- Add Items to Cart
- Update Cart Quantity
- Remove Items from Cart
- Schedule Pickup Time
- Place Pickup Orders
- View Order History
- Track Order Status

---

### 👨‍💼 Admin Features

- Admin Login
- Dashboard
- Food Management
  - Add Food
  - Edit Food
  - Delete Food
- Category Management
  - Add Category
  - Edit Category
  - Delete Category
- Customer Management
- Order Management
- Update Order Status
  - Pending
  - Confirmed
  - Preparing
  - Ready for Pickup
  - Completed
  - Cancelled

---

## 🔒 Access Control

- Customer Protected Routes
- Admin Protected Routes
- Simple Role-Based Access Control
- Customers cannot access Admin Pages

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- HTML5
- CSS3
- JavaScript (ES6)

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Maven

### Database

- MySQL

### Tools

- VS Code
- IntelliJ IDEA
- Postman
- Git
- GitHub
- MySQL Workbench

---

## 📂 Project Structure

```
restaurant-management-system
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── restaurant-backend
│   ├── src
│   ├── pom.xml
│   └── application.properties
│
└── README.md
```

---

## 🗄️ Database

The project uses **MySQL** as the relational database.

Main Tables:

- Users
- Categories
- Foods
- Cart
- Orders
- Order Items

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/YKbabu77/restaurant-management-system.git
```

---

### Backend

```bash
cd restaurant-backend
```

Run

```bash
./mvnw spring-boot:run
```

Backend runs on

```
http://localhost:8080
```

---

### Frontend

```bash
cd frontend
```

Install Dependencies

```bash
npm install
```

Run Project

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## 📷 Screenshots

Add screenshots of:

- Home Page
- Menu Page
- Cart
- Pickup Scheduling
- Customer Orders
- Admin Dashboard
- Food Management
- Category Management
- Order Management
- Customer Management

---

## 🔮 Future Improvements

- Spring Security
- JWT Authentication
- Email Notifications
- Cloud Image Upload (Cloudinary)
- Online Payment Integration
- Order Analytics Dashboard
- Customer Reviews & Ratings
- Restaurant Offers & Coupons
- Forgot Password
- Responsive Mobile Enhancements

---

## 📚 Learning Outcomes

This project helped in understanding:

- REST API Development
- Spring Boot Architecture
- CRUD Operations
- React Component Architecture
- State Management
- API Integration using Axios
- MySQL Database Design
- Role-Based Navigation
- Full-Stack Application Development
- Git & GitHub Version Control

---

## 👨‍💻 Author

**Konda Babu Yepuganti**

B.Tech - Information Technology

GitHub:
https://github.com/YKbabu77

---

## ⭐ Version

**Current Version:** 2.0

---

## 📄 License

This project is developed for educational purposes and personal learning.
