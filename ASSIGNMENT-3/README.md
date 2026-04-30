## 🌐 Deployment

This project is deployed and hosted at:
- **Lab-3 Host Link:** https://reactstudentscoreboard.vercel.app/


# 📊 Student Scoreboard Application

A modern, responsive **React-based management tool** for tracking and managing student scores, built as a Web Development assignment. This application provides a clean interface to view student performance, update scores in real-time, and add new students with automatic Pass/Fail status calculation.

---

## ✨ Features

- **📋 Dynamic Student Table** – View all students with their names, scores, and pass/fail status in an organized table format
- **⚡ Real-Time Score Updates** – Update student scores instantly with automatic Pass/Fail calculation (Pass ≥ 40)
- **➕ Add New Students** – Intuitive form to add new students to the scoreboard with immediate list updates
- **🎨 Pure CSS Styling** – Beautiful, responsive design built with vanilla CSS (no CSS-in-JS frameworks)
- **📱 Responsive Design** – Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **🚀 Fast Development Experience** – Powered by Vite for instant hot module replacement (HMR)

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library for building interactive components |
| **Vite** | Modern build tool and development server |
| **Pure CSS** | Styling without preprocessors or CSS-in-JS solutions |
| **JavaScript (ES6+)** | Core application logic |

---

## 🏗 Component Architecture

The application is built with a modular component structure:

```
App (Root Component)
├── Header
│   └── Displays application title
├── AddStudentForm
│   └── Handles new student input and submission
└── StudentTable
    └── StudentRow (Repeating)
        └── Handles individual student display and score updates
```

### Components Overview

| Component | Purpose |
|-----------|---------|
| **Header** | Displays the application title "Student Report Card" |
| **StudentTable** | Renders the table structure and manages all student rows |
| **StudentRow** | Individual student row with score display, status badge, and update functionality |
| **AddStudentForm** | Form to input new student name and score with validation |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd ASSIGNMENT-3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (default Vite port)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot module replacement |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 📋 Usage

1. **View Students** – The application loads with a default list of students showing their names, scores, and pass/fail status
2. **Update Scores** – Enter a new score in the input field next to any student and click "Update" to change their score
3. **Add Students** – Use the "Add New Student" form at the top to add new students by entering their name and initial score
4. **Auto Status** – Pass/Fail status updates automatically (Pass if score ≥ 40, Fail otherwise)

---


## 📁 Project Structure

```
ASSIGNMENT-3/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── StudentTable.jsx
│   │   ├── StudentRow.jsx
│   │   └── AddStudentForm.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
└── README.md
```

---

## 📝 License

This project is part of a Web Development 2 assignment.

---

**Happy Coding! 🎓**
