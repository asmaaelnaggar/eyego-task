# Eyego Dashboard Task

A responsive dashboard application built as part of the **Frontend Internship technical task for Eyego**.
The project demonstrates authentication, data management, visualization, and Dockerized deployment using modern frontend technologies.

---

## 🚀 Tech Stack

* **Next.js (React Framework)**
* **Tailwind CSS**
* **Redux Toolkit**
* **Recharts**
* **Docker**
* **JavaScript / TypeScript**

---

## 📊 Features

### Authentication

* Simple login system using a **mocked authentication API**
* User session stored in Redux state

### Dashboard

* Responsive layout built with **Tailwind CSS**
* Mobile-friendly design

### Data Table

The dashboard includes a dynamic table with:

* Sorting
* Filtering
* Pagination
* Export options:

  * **PDF Export**
  * **Excel (XLSX) Export**

### Chart Visualization

Data is visualized using **Recharts** to provide a clear overview of statistics and analytics.

### State Management

The application uses **Redux Toolkit** for managing global state including:

* Authentication state
* Table data
* Dashboard statistics

### Dockerized Application

The project is fully containerized using **Docker** to ensure easy setup and deployment.

---

## 📦 Project Structure

```
app/
components/
redux/
hooks/
public/
styles/
dockerfile
package.json
README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/asmaaelnaggar/eyego-task.git
```

```
cd eyego-task
```

---

### 2️⃣ Install Dependencies

```
npm install
```

---

### 3️⃣ Run Development Server

```
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## 🐳 Docker Setup

Build Docker Image

```
docker build -t eyego-dashboard .
```

Run Container

```
docker run -p 3000:3000 eyego-dashboard
```

Then open:

```
http://localhost:3000
```

---

## 🎥 Demo

A recorded demo explaining the dashboard features, authentication, table operations, charts, and Docker setup is included with the task submission.

---

## 📝 Implementation Approach

1. **Next.js** was used to structure the dashboard and handle routing.
2. **Redux Toolkit** manages authentication state and dashboard data.
3. **Tailwind CSS** provides a responsive and clean UI design.
4. **Recharts** was integrated to display analytics visually.
5. The data table supports **sorting, filtering, pagination, and exporting**.
6. The entire application is **Dockerized** to ensure consistent environment setup for testing and deployment.

---

## 👩‍💻 Author

Developed by **Asmaa Elnaggar**
Frontend Developer
