# 🎯 QUICK REFERENCE CARD

## One-Page Quick Start

### 🚀 Run the Application (3 Commands)

```bash
# Terminal 1: Backend
npm run dev

# Terminal 2: Frontend
cd frontend && npm start

# That's it! ✅
```

### 🌐 Access URLs

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend API** | http://localhost:5000 |
| **API Docs (Swagger)** | http://localhost:5000/api-docs |
| **Health Check** | http://localhost:5000/health |

### 🔑 Demo Credentials

```
Admin User:
  Email: admin@taskmanager.com
  Password: password123

Regular User:
  Email: user@taskmanager.com
  Password: password123
```

**First Time Setup:** Run `npm run seed` to create demo users!

### 📋 Main API Endpoints

**Authentication** (`/api/v1/auth`)
- POST `/register` - Create account
- POST `/login` - Login
- GET `/me` - Get profile
- POST `/logout` - Logout

**Tasks** (`/api/v1/tasks`)
- GET `/` - Get all tasks
- GET `/:id` - Get task
- POST `/` - Create task
- PUT `/:id` - Update task
- DELETE `/:id` - Delete task
- GET `/stats/me` - Get statistics

**Users** (`/api/v1/users`) - Admin Only
- GET `/` - Get all users
- GET `/:id` - Get user
- PUT `/:id` - Update user
- DELETE `/:id` - Delete user

### 📁 Project Structure

```
Backend:
├── server.js          # Entry point
├── config/            # Database, Swagger
├── controllers/       # Business logic
├── models/            # Database schemas
├── routes/            # API routes
├── middleware/        # Auth, validation
└── utils/             # Logger, helpers

Frontend:
├── src/
│   ├── pages/         # Page components
│   ├── components/    # Reusable UI
│   ├── context/       # Auth context
│   └── utils/         # API client
```

### 🔧 Key Technologies

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt
- Swagger
- Winston (Logging)
- Docker

**Frontend:**
- React 18
- React Router
- Axios
- CSS3 (Custom Design)

### 📊 Features Checklist

✅ JWT Authentication  
✅ Role-Based Access (User/Admin)  
✅ CRUD Operations (Tasks)  
✅ Input Validation  
✅ Error Handling  
✅ Rate Limiting  
✅ API Documentation  
✅ Professional UI  
✅ Responsive Design  
✅ Docker Ready  
✅ Scalable Architecture  

### 🐛 Quick Troubleshooting

**MongoDB not connecting?**
```bash
# Start MongoDB
mongod
```

**Port 5000 in use?**
```bash
# Change in .env
PORT=5001
```

**Dependencies issues?**
```bash
npm install
cd frontend && npm install
```

### 📚 Documentation Files

- `README.md` - Complete guide
- `SETUP.md` - Step-by-step setup
- `SCALABILITY.md` - Architecture details
- `SUBMISSION_CHECKLIST.md` - Submission guide
- `postman_collection.json` - API testing

### 🎨 UI Features

- 🌙 Dark theme
- ✨ Smooth animations
- 🎭 Glassmorphism effects
- 📱 Fully responsive
- 🎨 Modern gradients
- ⚡ Fast and fluid

### 🛡️ Security Features

- Password hashing (bcrypt)
- JWT authentication
- Rate limiting
- Input sanitization
- CORS protection
- Helmet security headers
- Environment variables

### 🐳 Docker Quick Start

```bash
# Run everything
docker-compose up

# Access API
http://localhost:5000
```

### 📈 Scalability Highlights

- Horizontal scaling ready
- Database indexing
- Caching strategy (Redis)
- Load balancing compatible
- Microservices architecture documented
- CDN integration plan
- Monitoring ready

### 🎯 Assignment Completion

**All Core Requirements:** ✅  
**Security Best Practices:** ✅  
**Scalability Documented:** ✅  
**Professional UI:** ✅  
**Complete Documentation:** ✅  

---

## 🚀 You're All Set!

**Ready to submit? Check:** `SUBMISSION_CHECKLIST.md`

**Need help? See:** `SETUP.md`

**Want details? Read:** `README.md`

---

**Built by:** Pruthviraj Tarode  
**For:** PrimeTrade AI - Backend Developer Intern  
**Date:** February 2026  

**Status:** 🎯 PRODUCTION READY

---

*Print this page for quick reference!*
