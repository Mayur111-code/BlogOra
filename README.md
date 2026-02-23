# BlogOra

A modern, full-stack blog application with user authentication, blog creation, and management features. Built with React and Express.js.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Features Details](#features-details)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Blog Creation**: Create, read, update, and delete blog posts
- **User Profiles**: User profiles with custom images
- **Blog Management**: Dashboard to manage user's blogs
- **Category System**: Organize blogs by categories
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Image Upload**: Support for blog and profile image uploads
- **Real-time Notifications**: Toast notifications for user feedback
- **Browse Blogs**: View all blogs with filtering and search capabilities

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Middleware**: CORS, Body Parser

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Linting**: ESLint

## 📁 Project Structure

```
BlogOra/
├── backend/
│   ├── config/
│   │   └── connectionDB.js          # MongoDB connection configuration
│   ├── controllers/
│   │   ├── blog.controller.js       # Blog CRUD logic
│   │   └── user.controller.js       # User authentication & profile logic
│   ├── middlewares/
│   │   ├── isAuthenticated.js       # JWT verification middleware
│   │   └── multer.js                # File upload configuration
│   ├── models/
│   │   ├── blog.model.js            # Blog schema
│   │   └── user.model.js            # User schema
│   ├── routes/
│   │   ├── blog.routes.js           # Blog endpoints
│   │   └── user.routes.js           # User endpoints
│   ├── uploads/                      # Uploaded files storage
│   ├── .env                          # Environment variables
│   ├── index.js                      # Main server file
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── BlogCard.jsx          # Blog card component
    │   │   ├── Footer.jsx            # Footer component
    │   │   ├── Hero.jsx              # Hero section
    │   │   ├── LatestBlogs.jsx       # Latest blogs display
    │   │   ├── Navbar.jsx            # Navigation bar
    │   │   └── shared/
    │   │       └── Container.jsx     # Reusable container component
    │   ├── pages/
    │   │   ├── Home.jsx              # Home page
    │   │   ├── Blogs.jsx             # All blogs page
    │   │   ├── About.jsx             # About page
    │   │   ├── Contact.jsx           # Contact page
    │   │   ├── Login.jsx             # Login page
    │   │   ├── Signup.jsx            # Registration page
    │   │   ├── Dashboard.jsx         # User dashboard
    │   │   └── SingleBlog.jsx        # Individual blog view
    │   ├── context/
    │   │   └── StoreContext.jsx      # Global state management
    │   ├── assets/
    │   │   └── assets.js             # Image and asset imports
    │   ├── App.jsx                   # Main app component
    │   ├── main.jsx                  # React entry point
    │   └── index.css                 # Global styles
    ├── index.html                    # HTML template
    ├── vite.config.js                # Vite configuration
    ├── eslint.config.js              # ESLint configuration
    ├── package.json
    └── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd BlogOra
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGO_URL="mongodb://localhost:27017/Blog-App"
JWT_SCERECT=your-secret-key-here
```

**Important Notes:**
- Replace `MONGO_URL` with your MongoDB connection string (local or MongoDB Atlas)
- Replace `JWT_SCERECT` with a strong secret key for JWT authentication
- Ensure the database name matches in your MongoDB connection string

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
npm run server
```

The backend server will start on `http://localhost:4000`

### Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` (or as shown in your terminal)

## 🌐 API Documentation

### User Routes (`/user`)

#### Register User
```
POST /user/register
Body: {
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Login User
```
POST /user/login
Body: {
  "email": "string",
  "password": "string"
}
Returns: { "token": "jwt-token", "user": {...} }
```

#### Get User Profile
```
GET /user/profile
Headers: { "Authorization": "Bearer <token>" }
```

#### Update User Profile
```
PATCH /user/profile
Headers: { "Authorization": "Bearer <token>" }
Body: { "name": "string", "image": "file" }
```

### Blog Routes (`/blog`)

#### Create Blog
```
POST /blog/create
Headers: { "Authorization": "Bearer <token>" }
Body: {
  "title": "string",
  "description": "string",
  "category": "string",
  "image": "file"
}
```

#### Get All Blogs
```
GET /blog/all
```

#### Get Blog by ID
```
GET /blog/:id
```

#### Get User's Blogs
```
GET /blog/my-blogs
Headers: { "Authorization": "Bearer <token>" }
```

#### Update Blog
```
PATCH /blog/:id
Headers: { "Authorization": "Bearer <token>" }
Body: { "title": "string", "description": "string", "category": "string" }
```

#### Delete Blog
```
DELETE /blog/:id
Headers: { "Authorization": "Bearer <token>" }
```

### Image Service

Access uploaded images:
```
GET /images/<filename>
```

## 📊 Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Model
```javascript
{
  title: String (required),
  description: String (required),
  category: String (required),
  image: String,
  author: {
    id: ObjectId (ref: User),
    name: String (required),
    image: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Features Details

### Authentication
- Users can register with email and password
- Passwords are encrypted using bcryptjs
- JWT tokens are issued upon login for secure API access
- All protected routes verify JWT tokens via middleware

### Blog Management
- Create blogs with title, description, category, and image
- Blog author information is automatically captured
- Update and delete blogs (only by author)
- View all blogs or user's specific blogs

### Image Upload
- Profile image upload for users
- Blog cover image upload
- Images stored in `uploads` folder
- Secure file handling with Multer

### User Dashboard
- Manage personal blog posts
- Create new blogs
- Edit existing blogs
- Delete blogs
- View blog statistics

### Browse & Discover
- View all blogs with details
- Filter by category
- Read individual blog posts
- See author information

## 🔧 Build & Deploy

### Build Frontend for Production
```bash
cd frontend
npm run build
```

### Preview Production Build
```bash
cd frontend
npm run preview
```

## 📝 Available Scripts

### Backend
```bash
npm run server    # Start development server with Nodemon
```

### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or verify Atlas connection string
- Check network settings if using MongoDB Atlas
- Verify credentials in `.env` file

### CORS Errors
- Ensure both frontend and backend are running
- Check that CORS middleware is enabled in backend
- Verify API base URL in frontend Axios configuration

### Port Already in Use
- Change the PORT in `backend/index.js` if 4000 is occupied
- Vite will auto-select available port if 5173 is occupied

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

Created by Mayur

## 🙏 Acknowledgments

- Express.js for the powerful backend framework
- React for the flexible UI library
- MongoDB for reliable data storage
- Tailwind CSS for beautiful styling
- All open-source libraries used in this project

---

**Happy Blogging! 📝**
