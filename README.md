
# Simple Login & Signup App

A simple full-stack web app for user login and signup, built with React (Vite) and Spring Boot, using MySQL for storage.

---

## Features

- Sign up with username, email, and password.
- Log in and see a welcome home page.
- Logout functionality.
- Data stored in MySQL.

---

## Tech Stack

- **Frontend**: React, Vite, Axios, React Router
- **Backend**: Spring Boot, Spring Data JPA
- **Database**: MySQL

---

## Setup

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven
- npm

### 1. Clone the Repo
```bash
git clone https://github.com/K-Nishant-18/login-signup-app.git
cd login-signup-app
```

### 2. Set Up MySQL
```sql
CREATE DATABASE login_db;
```
Update `spring-login-backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/login_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
```

### 3. Run Backend
```bash
cd spring-login-backend
mvn spring-boot:run
```

### 4. Run Frontend
```bash
cd react-login-frontend
npm install
npm run dev
```

### 5. Open App
Go to `http://localhost:5173` in your browser.

---

## API Endpoints

- **POST** `/api/auth/register` - `{username, password, email}`
- **POST** `/api/auth/login` - `{username, password}`

---

## Project Structure

```
login-signup-app/
├── spring-login-backend/  # Backend
└── react-login-frontend/  # Frontend
```

---
