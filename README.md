# Store Rating Platform

A Full Stack Store Rating Platform built using React.js, Node.js, Express.js, MySQL, JWT Authentication, and bcrypt.

## Project Overview

The Store Rating Platform allows users to register, login, browse stores, submit ratings, update ratings, and view average store ratings.

Administrators can manage users, stores, and monitor platform statistics through a dedicated admin dashboard.

---

## Features

### User Features

- User Registration
- User Login
- JWT Authentication
- Forgot Password
- View Stores
- Search Stores
- Submit Store Rating (1-5)
- Update Existing Rating
- View Average Store Rating
- View Personal Rating

### Admin Features

- Admin Dashboard
- Total Users Count
- Total Stores Count
- Total Ratings Count
- View All Users
- Search Users
- Sort Users by Name
- Add New User
- View All Stores
- Search Stores
- Sort Stores by Name
- Add New Store

### Store Owner Features

- Store Owner Login
- View Assigned Store
- View Average Rating
- View Users Who Rated Store
---

## Technology Stack

### Frontend

- React.js
- React Router DOM
- Axios
- CSS

### Backend

- Node.js
- Express.js

### Database

- MySQL

### Authentication & Security

- JWT (JSON Web Token)
- bcryptjs

---

## Database Tables

### Users

| Field | Type |
|---------|---------|
| id | INT |
| name | VARCHAR |
| email | VARCHAR |
| password | VARCHAR |
| address | VARCHAR |
| role | admin/user/store_owner |

### Stores

| Field | Type |
|---------|---------|
| id | INT |
| name | VARCHAR |
| email | VARCHAR |
| address | VARCHAR |
| owner_id | INT |

### Ratings

| Field | Type |
|---------|---------|
| id | INT |
| user_id | INT |
| store_id | INT |
| rating | INT |

---

## Project Structure

```
store-rating-platform
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── config
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── App.jsx
│   └── main.jsx
│
│
|── README.md
|
└── screenshots 

```

---

## Installation

### Backend

```bash
cd backend

npm install

npm start
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a .env file inside backend folder.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_platform

JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
```

### Stores

```http
GET /api/stores
GET /api/stores/:id/ratings
POST /api/stores
```

### Ratings

```http
POST /api/ratings
PUT /api/ratings/:id
```

### Admin

```http
GET /api/admin/dashboard
GET /api/admin/users
POST /api/admin/add-user
```

---


## Future Improvements

- Email Verification
- User Profile Management
- Rating Analytics
- Pagination
- Dark Mode
- Export Reports

---

## Author

**Ishwar Rathod**

BE Computer Engineering

Email: ishwarrathod708@gmail.com

GitHub: https://github.com/Ishwarrathod33/store-rating-platform

---

## License

This project is developed for educational and assessment purposes.