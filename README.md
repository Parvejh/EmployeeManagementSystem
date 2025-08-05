
# Employee Management System

A full-featured **Employee Management System** built using the **MIRN Stack** (MongoDB, Express.js, Node.js, HTML/CSS/JS). This project supports admin and employee roles with real-time dashboards, task assignment and submission, file uploads, activity logs, and secure authentication.

---

## 🌟 Features

- 🔐 Role-based Authentication (Admin & Employee)
- 📋 Task Assignment by Admin
- ✅ Task Submission & Status Update by Employees
- 📂 File Upload Support (via Multer)
- 📊 Real-time Dashboard Updates
- 🔎 Filtering, Pagination, and Logs
- 🧰 Modular Codebase (MVC Pattern)
- 🛡️ Middleware-Protected Routes
- 🖥️ EJS-based UI Templates

---

## 🗂️ Folder Structure & Key Files

| File | Description |
|------|-------------|
| `index.js` | App entry point, connects DB, sets up routes & server |
| `adminController.js` | Admin logic: assign, verify, control dashboards |
| `authController.js` | User auth: register, login, logout, role control |
| `employeeController.js` | Employee actions: view tasks, submit work |
| `authMiddleware.js` | Middleware for protecting routes & roles |
| `multer.js` | File upload config using Multer |
| `authRoutes.js` | Routes for login, register, logout |
| `dashboardRoutes.js` | Routes for admin/employee dashboard views |
| `tasksModel.js` | Mongoose schema for storing task data |

---

## 🛠️ Installation

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
```

2. **Install Dependencies**

```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the root:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
PORT=3000
```

4. **Start the Application**

```bash
node index.js
```

App will run at: `http://localhost:3000`

---

## 🤝 Contributing

Pull requests are welcome! Feel free to open issues or suggest features.

---

## 📬 Contact

For project-related queries or collaborations, reach out at: `your.email@example.com`

---

> Built with ❤️ by [Your Name]
