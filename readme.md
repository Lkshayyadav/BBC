# Student Grievance Redressal System

A complete full-stack web application for managing student complaints with role-based access control.

---

## 🎯 Project Overview

This system allows:
- **Students** to submit and track grievances
- **Admins** to manage, assign, and resolve complaints
- Real-time status tracking with transparency
- Secure authentication using JWT

---

## 🛠️ Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Responsive design

### Backend
- Node.js & Express.js
- RESTful API architecture
- JWT authentication
- bcrypt password hashing

### Database
- MongoDB (Cloud - MongoDB Atlas)

---

## 📁 Project Structure

```
student-grievance-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── complaints.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── config.js
    ├── index.html
    ├── login.html
    ├── register.html
    ├── student-dashboard.html
    └── admin-dashboard.html
```

---

## 🚀 Local Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier)
- Code editor (VS Code recommended)

### Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Replace `<password>` with your database password
7. Add `/grievance_db` before `?retryWrites`

Your final URI should look like:
```
mongodb+srv://username:password@cluster.mongodb.net/grievance_db?retryWrites=true&w=majority
```

### Step 2: Setup Backend

1. Open terminal and navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend folder with:
```env
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_random_secret_key_here
PORT=5000
```

**Generate a secure JWT_SECRET:**
```bash
# On Mac/Linux:
openssl rand -base64 32

# Or use any random string like:
mySecureJWT2024Key!@#RandomString
```

4. Start the backend server:
```bash
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

### Step 3: Setup Frontend

1. Open `frontend/js/config.js`
2. Verify `API_BASE_URL` is set to `http://localhost:5000/api`
3. Open `frontend/index.html` in your browser, or use Live Server extension in VS Code

### Step 4: Test the Application

1. **Register a Student:**
   - Go to `http://localhost:5000/frontend/register.html` (or use Live Server)
   - Fill in details:
     - Name: John Doe
     - Email: john@student.com
     - Password: password123
     - Role: Student
     - Student ID: STU001
   - Click Register

2. **Register an Admin:**
   - Go to register page again
   - Fill in details:
     - Name: Admin User
     - Email: admin@college.com
     - Password: admin123
     - Role: Admin
   - Click Register

3. **Login as Student:**
   - Login with: john@student.com / password123
   - Submit a complaint
   - View your complaints

4. **Login as Admin:**
   - Login with: admin@college.com / admin123
   - View all complaints
   - Update complaint status

---

## ☁️ Cloud Deployment

### Backend Deployment (Render)

1. Create account on [Render](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository (push your code to GitHub first)
4. Configure:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment Variables:**
     - `MONGO_URI`: Your MongoDB Atlas URI
     - `JWT_SECRET`: Your secret key
     - `PORT`: 5000

5. Click "Create Web Service"
6. Copy your deployed URL (e.g., `https://your-app.onrender.com`)

### Frontend Deployment (Netlify)

1. Create account on [Netlify](https://netlify.com)
2. Drag & drop your `frontend` folder
3. After deployment, update `frontend/js/config.js`:
```javascript
const API_BASE_URL = 'https://your-backend-url.onrender.com/api';
```
4. Re-upload to Netlify

### Alternative: Deploy Both Together

Use **Railway** or **Render** to deploy both:
1. Create a `package.json` in root folder
2. Add scripts to serve frontend as static files from backend
3. Deploy the entire project

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Complaints (Protected)
- `POST /api/complaints` - Create complaint (Student)
- `GET /api/complaints/my` - Get my complaints (Student)
- `GET /api/complaints` - Get all complaints (Admin)
- `PUT /api/complaints/:id` - Update complaint (Admin)
- `DELETE /api/complaints/:id` - Delete complaint (Admin)

---

## 🎨 Features Implemented

✅ User authentication with JWT  
✅ Role-based authorization (Student/Admin)  
✅ Password hashing with bcrypt  
✅ Complaint submission with categories  
✅ Real-time status tracking  
✅ Admin dashboard with filters  
✅ Update complaint status & remarks  
✅ Responsive UI design  
✅ Secure API endpoints  
✅ MongoDB cloud database  

---

## 📝 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "student" | "admin",
  studentId: String (for students),
  createdAt: Date
}
```

### Complaints Collection
```javascript
{
  studentId: ObjectId (ref: User),
  studentName: String,
  studentEmail: String,
  category: "Academic" | "Hostel" | "Library" | "Canteen" | "Infrastructure",
  description: String,
  status: "Pending" | "In Progress" | "Resolved",
  assignedTo: String,
  remarks: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔄 System Flow

1. **Student Journey:**
   - Register → Login → Submit Complaint → Track Status

2. **Admin Journey:**
   - Login → View All Complaints → Filter by Status/Category → Update Status → Add Remarks

3. **Data Flow:**
   - Frontend → API Request → Backend validates JWT → Database Query → Response to Frontend

---

## 🐛 Troubleshooting

### Backend won't start:
- Check if MongoDB URI is correct in `.env`
- Verify all npm packages installed
- Check if port 5000 is available

### Frontend can't connect to backend:
- Check `config.js` has correct API URL
- Verify backend is running
- Check browser console for CORS errors

### Database connection fails:
- Verify MongoDB Atlas allows connections from your IP
- Check username/password in connection string
- Ensure database user has read/write permissions

---

## 📚 Viva Questions & Answers

**Q: What is JWT and why did you use it?**  
A: JWT (JSON Web Token) is a secure way to transmit information between client and server. I used it for stateless authentication where the token contains user info and is verified on each request without storing sessions.

**Q: How does password hashing work?**  
A: I used bcrypt to hash passwords before storing them. When a user registers, their password is hashed with a salt. During login, we compare the hashed version of input password with stored hash.

**Q: Explain the difference between authentication and authorization.**  
A: Authentication verifies WHO the user is (login). Authorization determines WHAT they can do (student can only see their complaints, admin can see all).

**Q: Why MongoDB instead of MySQL?**  
A: MongoDB is flexible with schema changes, perfect for prototypes. It stores data as JSON-like documents, which matches our JavaScript ecosystem, and scales easily on the cloud.

**Q: How would you prevent unauthorized access?**  
A: I implemented JWT middleware that checks the token on protected routes. The token expires after 7 days, and role-based middleware ensures only admins can access admin endpoints.

---

## 🚀 Future Enhancements

- Email notifications on status updates
- File attachments for complaints
- Chat system between student and admin
- Analytics dashboard
- Mobile app version
- Multi-language support

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Author

**Your Name**  
Final Year Project - [Your College Name]  
GitHub: [Your GitHub]  
LinkedIn: [Your LinkedIn]

---

## 🙏 Acknowledgments

Built as a college final year project demonstrating full-stack development skills with real-world application architecture.