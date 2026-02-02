# 🚀 Quick Setup Guide

## Prerequisites Check

Before starting, make sure you have:

- [ ] **Node.js 18+** installed ([Download](https://nodejs.org/))
- [ ] **MongoDB** installed or MongoDB Atlas account ([Cloud](https://www.mongodb.com/cloud/atlas))
- [ ] **Git** installed ([Download](https://git-scm.com/))
- [ ] **Postman** (optional) for API testing ([Download](https://www.postman.com/downloads/))

---

## 📦 Step-by-Step Installation

### 1. Clone or Navigate to Project

```bash
cd c:\Users\pruth\OneDrive\Desktop\Assignmnet
```

### 2. Install Backend Dependencies

```bash
npm install
```

Expected output:
```
added 156 packages in 12s
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Start MongoDB

#### Option A: Local MongoDB
```bash
# Windows
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"

# Mac/Linux
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `.env` file with connection string

### 5. Configure Environment

The `.env` file is already configured with defaults. Verify it contains:

```env
MONGODB_URI=mongodb://localhost:27017/scalable-api
JWT_SECRET=primetrade_secret_key_2026_backend_assignment
PORT=5000
```

---

## ▶️ Running the Application

### Terminal 1: Start Backend

```bash
# Development mode with auto-reload
npm run dev

# OR Production mode
npm start
```

✅ Backend running at: http://localhost:5000

### Terminal 2: Start Frontend

```bash
cd frontend
npm start
```

✅ Frontend running at: http://localhost:3000

---

## 🧪 Testing the Application

### 1. Open Browser

Navigate to: http://localhost:3000

### 2. Create an Account

1. Click **"Sign Up"**
2. Fill in details:
   - Name: `Your Name`
   - Email: `your@email.com`
   - Password: `Test123!` (must have uppercase, lowercase, number)
   - Role: Choose `User` or `Admin`
3. Click **"Create Account"**

### 3. Explore Features

**User Features:**
- ✅ View Dashboard (task statistics)
- ✅ Create, Read, Update, Delete tasks
- ✅ Filter tasks by status/priority
- ✅ Track task progress

**Admin Features (if you selected Admin role):**
- ✅ All user features
- ✅ View all users
- ✅ Change user roles
- ✅ Activate/deactivate users
- ✅ Delete users

### 4. Test API Documentation

Open: http://localhost:5000/api-docs

1. Click **"Authorize"** button
2. Login first to get token:
   - Go to `/auth/login` endpoint
   - Click "Try it out"
   - Enter email and password
   - Click "Execute"
   - Copy the `token` from response
3. Enter: `Bearer <your-token-here>`
4. Try any endpoint!

---

## 📨 Using Postman

### Import Collection

1. Open Postman
2. Click **Import** button
3. Select `postman_collection.json` from project folder
4. Click **Import**

### Create Environment

1. Click **Environments** (left sidebar)
2. Create new environment: **Scalable API Dev**
3. Add variables:
   ```
   baseUrl: http://localhost:5000/api/v1
   token: (leave empty - will auto-fill after login)
   ```
4. Save

### Test Flow

1. **Register User** → Auto-saves token
2. **Login** → Updates token
3. **Create Task** → Auto-saves taskId
4. **Get All Tasks** → View all tasks
5. **Update Task** → Modify task
6. **Delete Task** → Remove task

---

## 🐳 Using Docker (Alternative)

If you have Docker installed:

```bash
# Build and start all services (MongoDB, Redis, API)
docker-compose up --build

# Stop all services
docker-compose down
```

Access:
- API: http://localhost:5000
- Frontend: Build separately with `cd frontend && npm start`

---

## ✅ Verification Checklist

Test each feature:

### Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] View profile
- [ ] Logout

### Tasks
- [ ] Create new task
- [ ] View all tasks
- [ ] Filter by status
- [ ] Filter by priority
- [ ] Update task
- [ ] Delete task
- [ ] View statistics

### Admin (if admin role)
- [ ] View all users
- [ ] Change user role
- [ ] Deactivate user
- [ ] Delete user

### API Documentation
- [ ] Access Swagger UI
- [ ] Test endpoints
- [ ] View schemas

---

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
```bash
# Make sure MongoDB is running
mongod

# OR update .env to use MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/scalable-api
```

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9

# OR change port in .env
PORT=5001
```

### Frontend Not Connecting to Backend

**Error:** Network errors in browser console

**Solution:**
1. Verify backend is running: http://localhost:5000/health
2. Check `frontend/package.json` has `"proxy": "http://localhost:5000"`
3. Restart frontend: `cd frontend && npm start`

### Dependencies Installation Failed

**Error:** `npm ERR! code ENOENT`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 What to Expect

### Backend Console:
```
[2026-02-02 13:30:00] info: MongoDB Connected: localhost
[2026-02-02 13:30:00] info: Server running in development mode on port 5000
[2026-02-02 13:30:00] info: API Documentation available at http://localhost:5000/api-docs
```

### Frontend Browser:
- Modern dark theme UI
- Smooth animations
- Responsive design
- Toast notifications for actions

### API Response Example:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Your Name",
      "email": "your@email.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 🎯 Next Steps

1. ✅ Explore all features
2. ✅ Test API endpoints in Swagger
3. ✅ Review code structure
4. ✅ Read [README.md](README.md) for details
5. ✅ Check [SCALABILITY.md](SCALABILITY.md) for architecture

---

## 📞 Need Help?

If you encounter any issues:

1. Check this guide thoroughly
2. Review error messages carefully
3. Check logs in `logs/` folder
4. Verify all prerequisites are installed
5. Ensure MongoDB is running

---

**Ready to impress! 🚀**

Built with ❤️ by Pruthviraj Tarode for PrimeTrade AI
