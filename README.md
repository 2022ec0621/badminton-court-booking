# 🏸 Badminton Court Booking Platform  
Full-Stack MERN Application with Authentication, Pricing Engine, and Admin Dashboard.

---

## 🌍 Live Demo

- **Frontend (Netlify):** https://court-booking.netlify.app/  
- **Backend API (Render):** https://badminton-court-booking.onrender.com/

---

## 📌 Overview

This is a fully functional **Badminton Court Booking Platform** where users can:

### ✔ User Features
- View courts  
- Select date & time slots  
- Add optional services (Racket, Coach)  
- Live price preview  
- Book courts  
- View their own bookings  

### ✔ Admin Features
- Manage courts  
- Manage coaches (availability toggle)  
- Create/Delete pricing rules  
- View all bookings  

The system supports **JWT Authentication**, **Role-Based Access**, **Dynamic Pricing**, and **Real Deployments**.

---

# 🏗 Technology Stack

### **Frontend**
- React 18  
- Vite  
- Tailwind CSS  
- Axios  
- React Router  
- Deployed on Netlify  

### **Backend**
- Node.js + Express  
- MongoDB Atlas  
- Mongoose  
- JWT Authentication  
- CORS  
- Deployed on Render  

---

# 📂 Project Structure

project-root/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── seed/
│ ├── server.js
│ └── package.json
│
└── frontend/
├── src/
├── index.html
└── package.json

yaml
Copy code

---

# 🔐 Authentication System

### **Login**
POST /api/auth/login
{
"email": "admin@demo.com",
"password": "password"
}

markdown
Copy code

### **Register**
POST /api/auth/register

yaml
Copy code

### Token Flow
- JWT returned on login  
- Stored in `localStorage`  
- Axios attaches token automatically  
- Protected routes require valid JWT  

---

# 💸 Pricing Engine

Your system supports 3 rule types:

| Rule Type | Description |
|----------|-------------|
| **flat** | Adds a fixed amount (e.g., +₹100) |
| **multiplier** | Multiplies base price (e.g., ×1.5) |
| **override** | Sets absolute price (e.g., ₹500) |

### Price Preview Example
GET /api/price/preview
?courtId=123
&date=2025-02-19
&slot=10:00-11:00
&addRacket=true
&addCoach=true
&coachId=abc

makefile
Copy code

Returns:
{
"total": 35,
"breakdown": [
{ "label": "base", "amount": 10 },
{ "label": "racket", "amount": 5 },
{ "label": "coach", "amount": 20 }
]
}

pgsql
Copy code

---

# 📚 API Endpoints

## Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Create new user |
| POST | /api/auth/login | Authenticate user |
| GET | /api/auth/me | Get logged-in user |

## Courts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/courts | List courts |
| POST | /api/courts | Admin add court |

## Coaches
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/coaches | List coaches |
| POST | /api/coaches | Admin add coach |
| PATCH | /api/coaches/:id/availability | Toggle availability |

## Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/bookings | User/Admin bookings |
| POST | /api/bookings | Create booking |

## Pricing
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/price/preview | Live price calculation |
| GET | /api/price/rules | Admin list rules |
| POST | /api/price/rules | Admin create rule |
| DELETE | /api/price/rules/:id | Admin delete rule |

---

# 💾 Installation & Local Development

## 1️⃣ Clone the repo
git clone <repository-url>
cd project-root

yaml
Copy code

---

## 2️⃣ Backend Setup
cd backend
npm install
cp .env.example .env

bash
Copy code

Update `.env`:
MONGO_URI=your_atlas_connection_string
JWT_SECRET=some_secure_random_string
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173

shell
Copy code

### Seed database:
npm run seed

shell
Copy code

### Run backend:
npm run dev

yaml
Copy code

Server will run at:  
➡ http://localhost:4000

---

## 3️⃣ Frontend Setup
cd frontend
npm install
cp .env.example .env

bash
Copy code

Update `.env`:
VITE_API_BASE=http://localhost:4000/api

shell
Copy code

### Run frontend:
npm run dev

markdown
Copy code

Frontend runs at:  
➡ http://localhost:5173

---

# 🚀 Production Deployment

## Backend → Render
- Build command: `npm install`
- Start command: `npm start`
- Environment Variables:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `FRONTEND_ORIGIN=https://court-booking.netlify.app`

## Frontend → Netlify
- Base directory: `frontend`
- Build: `npm run build`
- Publish directory: `dist`
- Environment variable:
VITE_API_BASE=https://badminton-court-booking.onrender.com/api

yaml
Copy code

---

# 🧪 Test Accounts

| Role | Email | Password |
|------|--------|----------|
| **Admin** | admin@demo.com | password |
| **User** | test@example.com | password |

---

# 🎯 Feature Summary

### User
- Login/Register  
- Browse courts  
- Book slots  
- Add-ons (racket, coach)  
- Price preview  
- Booking history  

### Admin
- Manage courts  
- Manage coaches  
- Pricing rules dashboard  
- View all bookings  

---
