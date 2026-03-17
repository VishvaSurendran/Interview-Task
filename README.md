# Live Metrics Dashboard

A full-stack web application built with React, Node.js (Express), and PostgreSQL. This project displays dynamic, live data through an interactive dashboard with auto-refresh capabilities.

## Setup & Installation Guide

### Prerequisites
* Node.js installed
* PostgreSQL installed and running locally
* Git installed

### 1. Clone the Repository
Open your terminal and clone the project to your local machine:

    git clone [https://github.com/VishvaSurendran/Interview-Task.git](https://github.com/VishvaSurendran/Interview-Task.git)
    cd Interview-Task

### 2. Database Setup
1. Open your pgAdmin.
2. Create a new database named `interview_task`:

    CREATE DATABASE interview_task;

### 3. Backend Setup

1. Install the necessary dependencies:

    npm install

2. Create a `.env` file inside the `backend` directory and add your local database credentials:

    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=interview_task
    PORT=5000

3. Start the backend server:

    npm run dev

### 4. Frontend Setup

1. Install the necessary dependencies:

    npm install

2. Start the React development server:

    npm run dev

---

## Important Notes for Reviewers

* Automatic Table Creation: You do not need to manually run any SQL scripts to create tables. The Node.js server includes an initialization script that will automatically create the `orders` table inside the `interview_task` database the first time you start the backend.
* Live Data Testing: To test the auto-refresh feature, use the "Add Order" form at the top of the frontend dashboard. When you submit a new order, the dashboard will automatically fetch and render the updated charts and metrics without requiring a page reload.
