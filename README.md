# 🚀 FullStack Todo App

A full-stack web application for managing daily tasks, built as a monorepo with a FastAPI backend and a Next.js frontend.

## 🛠️ Tech Stack

Backend: Python, FastAPI, SQLModel, PostgreSQL, Alembic

Frontend: Next.js, React, Tailwind CSS, shadcn/ui, TanStack React Query

Tools: Concurrently, Prettier, Husky

## 📂 Project Structure

backend/ — FastAPI application, API routes, database models, and Alembic migrations.

frontend/ — Next.js pages, components, and state management using React Query.

## ⚙️ Installation & Setup

1. **Clone the repository:**
   git clone https://github.com/YaroslavBoliachevets/fullstack-todo-app.git
   cd fullstack-todo-app

2. **Install all dependencies:**
   npm run install:all

3. **Configure environment variables:**
   Create a .env file inside the backend/ directory and specify your database and CORS
   connection strings:
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   ALLOWED_ORIGINS=http://localhost:3000,https://your-project-name.vercel.app

## 🚀 Running the Application

Start both the backend and frontend development servers concurrently:
npm run dev
Frontend Application: http://localhost:3000
Backend API & Swagger Docs: http://127.0.0.1:8000/docs

## 📋 Features & Usage

Task Creation: Add new tasks with a title (1–100 characters), an optional description (up to 200 characters), and a priority level (1–10).

Search: Search tasks dynamically using the search bar.

Filtering: Filter tasks by their current status (All, In progress, Ready).

Sorting: Sort tasks by priority, date, or title in ascending or descending order.

Task Management: Toggle task completion status or delete tasks directly from the interface.

## 🧪 Testing

Run the backend test suite using `pytest`:

1. **Navigate to the backend directory:**
   cd backend

2. **Activate the virtual environment:**
   ```bash
   # Windows (PowerShell)
   venv\Scripts\Activate.ps1

   # macOS / Linux
   source venv/bin/activate
   ```
   Run pytest:
   pytest -v
