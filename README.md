# Task Management App

A full-stack task management application built with React frontend and Express.js backend. Users can register, log in, and manage their own tasks with features like search, filtering, and pagination.

## Features

- **Authentication**: Secure user registration and login with JWT tokens
- **Task Management**: Full CRUD operations for tasks (Create, Read, Update, Delete)
- **Search & Filter**: Search tasks by title/description and filter by status
- **Pagination**: Efficient task loading with pagination
- **Responsive UI**: Clean and modern interface built with TailwindCSS
- **Real-time Updates**: Optimistic updates using React Query

## Tech Stack

### Frontend
- React 18
- React Router DOM
- React Query (TanStack Query)
- Axios
- TailwindCSS
- React Hook Form
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Express Validator

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd task-management-app
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (root, server, and client)
npm run install-all
```

### 3. Environment Setup

#### Backend Environment
Create a `.env` file in the `server` directory:
```bash
cd server
cp env.example .env
```

Edit the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
```

For MongoDB Atlas, replace the MONGODB_URI with your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
```

### 4. Start the application

#### Development Mode (Both frontend and backend)
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5007
- Frontend development server on http://localhost:3000

#### Individual Services

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

### 5. Production Build
```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
  - Query params: `page`, `limit`, `search`, `status`
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Dashboard**: View all your tasks with search and filter options
3. **Create Task**: Click "Add Task" to create a new task
4. **Edit Task**: Click "Edit" on any task card to modify it
5. **Delete Task**: Click "Delete" on any task card to remove it
6. **Search**: Use the search bar to find tasks by title or description
7. **Filter**: Use the status filter buttons to show All, Pending, or Done tasks
8. **Pagination**: Navigate through multiple pages of tasks

## Project Structure

```
task-management-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts (Auth)
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main app component
│   ├── public/
│   └── package.json
├── server/                 # Express backend
│   ├── index.js           # Main server file
│   ├── package.json
│   └── env.example        # Environment variables example
├── package.json           # Root package.json
└── README.md
```

## Deployment

### Vercel + MongoDB Atlas (Recommended)

1. **Deploy Backend to Vercel:**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy the server directory

2. **Deploy Frontend to Vercel:**
   - Create a new Vercel project for the client
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Deploy

3. **MongoDB Atlas:**
   - Create a free cluster on MongoDB Atlas
   - Get your connection string
   - Update the MONGODB_URI in your environment variables

### Alternative Deployment Options

- **Heroku**: Deploy both frontend and backend
- **Netlify**: Deploy frontend, use serverless functions for backend
- **Railway**: Deploy full-stack application

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5007
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
