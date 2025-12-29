# Employee Management System (MERN)

A full-stack **Employee Management System** built using the **MERN stack**.  
The application allows managing employees with full CRUD functionality, search, filtering, pagination, responsive UI.

---

## 🚀 Features

### Core
- Create, Read, Update, Delete (CRUD) employees
- Employee fields:
  - Name
  - Email
  - Role
  - Department
  - Salary
  - Status (Active / Inactive)

### UI & UX
- Responsive design  
  - **Desktop:** Table view  
  - **Mobile:** Card view
- Status indicator (green = active, red = inactive)
- Pagination
- Search by name or email
- Filter by status
- Confirmation dialog for delete
- Toast notifications for actions

### Backend
- RESTful APIs using Express
- MongoDB for persistent storage
- Mongoose schema validation
- Proper error handling

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Axios
- Sonner (toast notifications)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📂 Project Structure

```bash
Employee_Management/
│
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── lib/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ └── tailwind.config.js
│
├── .gitignore
└── README.md
```


---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
## ▶️ Running the Project Locally

1️⃣ Clone the repository

```bash

git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
```

2️⃣ Backend Setup

```bash

cd backend
npm install
npm run dev

```
3️⃣ Frontend Setup

```bash

cd frontend
npm install
npm run dev
```
