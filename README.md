# 📋 Scalable REST API with Authentication & RBAC

> **Backend Developer Intern Assignment** - Complete task management system with secure authentication and role-based access control

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen.svg)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 👤 Author

**Pruthviraj Tarode**  
Backend Developer Intern Candidate

## 📝 Assignment Overview

This project implements a **production-ready REST API** with comprehensive features:

✅ User authentication (JWT + bcrypt)  
✅ Role-based access control (User/Admin)  
✅ CRUD operations for tasks  
✅ API versioning & documentation (Swagger)  
✅ Input validation & sanitization  
✅ Rate limiting & security  
✅ Professional frontend UI  
✅ Docker deployment ready  
✅ Comprehensive logging  

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Assignmnet

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/scalable-api
JWT_SECRET=your_secret_key_here
PORT=5000
```

### Running the Application

#### Option 1: Development Mode

```bash
# Terminal 1: Start MongoDB (if local)
mongod

# Terminal 2: Start Backend Server
npm run dev

# Terminal 3: Start Frontend
cd frontend
npm start
```

#### Option 2: Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Access Points

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Documentation (Swagger):** http://localhost:5000/api-docs
- **Health Check:** http://localhost:5000/health

---

## 📁 Project Structure

```
├── config/                 # Configuration files
│   ├── database.js        # MongoDB connection
│   └── swagger.js         # Swagger/OpenAPI setup
├── controllers/           # Request handlers
│   ├── authController.js  # Authentication logic
│   ├── userController.js  # User management
│   └── taskController.js  # Task CRUD operations
├── middleware/            # Express middleware
│   ├── authMiddleware.js  # JWT verification & RBAC
│   ├── errorHandler.js    # Global error handling
│   ├── validator.js       # Input validation rules
│   └── rateLimiter.js     # Rate limiting
├── models/                # Database schemas
│   ├── User.js           # User model
│   └── Task.js           # Task model
├── routes/                # API route definitions
│   ├── authRoutes.js     # /api/v1/auth
│   ├── userRoutes.js     # /api/v1/users
│   └── taskRoutes.js     # /api/v1/tasks
├── utils/                 # Utility functions
│   └── logger.js         # Winston logging
├── frontend/              # React frontend
│   ├── public/           # Static files
│   └── src/              # React components
│       ├── components/   # Reusable components
│       ├── context/      # React Context (Auth)
│       ├── pages/        # Page components
│       └── utils/        # API client
├── logs/                  # Application logs
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── Dockerfile            # Docker container config
├── docker-compose.yml    # Multi-container Docker setup
├── package.json          # Dependencies & scripts
├── server.js             # Express server entry point
├── README.md             # This file
└── SCALABILITY.md        # Scalability documentation
```

---

## 🔐 API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | User login | Public |
| GET | `/me` | Get current user | Private |
| POST | `/logout` | Logout user | Private |

### User Routes (`/api/v1/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all users | Admin |
| GET | `/:id` | Get user by ID | Admin |
| PUT | `/:id` | Update user | Admin |
| DELETE | `/:id` | Delete user | Admin |

### Task Routes (`/api/v1/tasks`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all tasks | Private |
| GET | `/stats/me` | Get task statistics | Private |
| GET | `/:id` | Get task by ID | Private |
| POST | `/` | Create new task | Private |
| PUT | `/:id` | Update task | Private |
| DELETE | `/:id` | Delete task | Private |

---

## 🎨 Frontend Features

### Pages

1. **Home** - Landing page with features showcase
2. **Login** - User authentication
3. **Register** - New user registration
4. **Dashboard** - Task statistics and overview
5. **Tasks** - Full CRUD task management
6. **Admin Panel** - User management (Admin only)

### Key Features

- 🎯 Modern, responsive UI with dark theme
- ⚡ Real-time API integration
- 🔒 Protected routes with authentication
- 📱 Mobile-friendly design
- 🎨 Glassmorphism and gradient effects
- ✨ Smooth animations and transitions

---

## 🛡️ Security Features

### Authentication & Authorization
- **JWT tokens** for stateless authentication
- **bcrypt** password hashing (10 salt rounds)
- **Role-based access control** (User/Admin)
- Token expiration and refresh handling

### Input Validation
- **express-validator** for request validation
- **Sanitization** of user inputs
- **Type checking** and format validation
- **Custom validation rules**

### API Protection
- **Rate limiting** (100 requests per 15 minutes)
- **Stricter auth limits** (5 login attempts per 15 minutes)
- **Helmet** for HTTP header security
- **CORS** configuration

### Data Protection
- **Protected password fields** (never returned in responses)
- **MongoDB query injection** prevention
- **XSS protection** via sanitization

---

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin']),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String,
  status: String (enum: ['pending', 'in-progress', 'completed']),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  user: ObjectId (ref: User),
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- User: `email`, `role`
- Task: `user + status`, `createdAt`, `dueDate`

---

## 🧪 Testing the API

### Demo Credentials

**Regular User:**
```
Email: user@example.com
Password: password123
```

**Admin User:**
```
Email: admin@example.com  
Password: admin123
```

### Using Swagger UI

1. Navigate to http://localhost:5000/api-docs
2. Click "Authorize" button
3. Enter: `Bearer <your-jwt-token>`
4. Test all endpoints interactively

### Using Postman

Import the `postman_collection.json` file included in this repository.

1. Open Postman
2. Import → Upload Files → Select `postman_collection.json`
3. Set environment variable `token` after login
4. Test all endpoints

---

## 📈 Scalability Considerations

See **[SCALABILITY.md](SCALABILITY.md)** for detailed information on:

- Horizontal & Vertical Scaling
- Caching with Redis
- Load Balancing
- Microservices Architecture
- Database Optimization
- CDN Integration
- Monitoring & Logging

---

## 🐳 Docker Deployment

### Build and Run

```bash
# Build the Docker image
docker build -t scalable-api .

# Run with Docker Compose (includes MongoDB & Redis)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Services

- **api**: Node.js Express server (Port 5000)
- **mongodb**: MongoDB database (Port 27017)
- **redis**: Redis cache (Port 6379)

---

## 📝 Logging

Logs are managed by **Winston** and stored in the `logs/` directory:

- **error.log** - Error-level logs
- **combined.log** - All logs

Logs include:
- Request/response details
- Authentication events
- Database operations
- Error stack traces

---

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | development |
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/scalable-api |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:3000 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit time window | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

---

## 🛠️ Available Scripts

### Backend

```bash
npm start          # Start production server
npm run dev        # Start dev server with nodemon
npm test           # Run tests
npm run docker:build  # Build Docker image
npm run docker:run    # Run with Docker Compose
```

### Frontend

```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

---

## 📚 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Winston** - Logging
- **Swagger** - API documentation
- **express-validator** - Validation
- **Helmet** - Security headers

### Frontend
- **React** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **CSS3** - Styling (custom design system)

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

---

## ✨ Key Highlights

### Why This Implementation Stands Out

1. **Production-Ready Code**
   - Comprehensive error handling
   - Proper logging and monitoring
   - Security best practices
   - Scalable architecture

2. **Professional UI/UX**
   - Modern design with dark theme
   - Glassmorphism effects
   - Smooth animations
   - Fully responsive

3. **Clean Code**
   - Modular structure
   - Separation of concerns
   - Reusable components
   - Well-documented

4. **Security First**
   - JWT authentication
   - Rate limiting
   - Input validation
   - RBAC implementation

5. **Developer Experience**
   - Swagger documentation
   - Docker deployment
   - Environment-based config
   - Easy to extend

---

## 🎯 Assignment Checklist

- [x] User registration & login with JWT
- [x] Password hashing (bcrypt)
- [x] Role-based access control
- [x] CRUD APIs for secondary entity (Tasks)
- [x] API versioning (v1)
- [x] Error handling & validation
- [x] API documentation (Swagger)
- [x] Database schema (MongoDB)
- [x] React frontend
- [x] Protected dashboard
- [x] CRUD operations in UI
- [x] Error/success messages
- [x] Secure JWT handling
- [x] Input sanitization
- [x] Scalable project structure
- [x] Rate limiting
- [x] Logging (Winston)
- [x] Docker deployment
- [x] GitHub repository
- [x] README documentation
- [x] Scalability notes

---

## 📞 Contact

**Pruthviraj Tarode**  
Email: [Your Email]  
GitHub: [Your GitHub]  
LinkedIn: [Your LinkedIn]

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

Built for **PrimeTrade AI** Backend Developer Intern position.  
Special thanks to the team for this opportunity to demonstrate my skills!

---

**Made with ❤️ by Pruthviraj Tarode**
