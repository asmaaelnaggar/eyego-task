"use client";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function UsersChart() {
  const [users, setUsers] = useState([]);
  const [roleData, setRoleData] = useState({ labels: [], counts: [] });

  // Fetch users
  useEffect(() => {
    axios.get("/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  // Prepare chart data
  useEffect(() => {
    const roles = {};
    users.forEach(user => {
      roles[user.role] = (roles[user.role] || 0) + 1;
    });

    setRoleData({
      labels: Object.keys(roles),
      counts: Object.values(roles)
    });
  }, [users]);

  const barData = {
    labels: roleData.labels,
    datasets: [
      {
        label: "Users per Role",
        data: roleData.counts,
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      }
    ]
  };

  const pieData = {
    labels: roleData.labels,
    datasets: [
      {
        label: "Users per Role",
        data: roleData.counts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40"
        ],
      }
    ]
  };

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-2">Bar Chart - Users per Role</h3>
        <Bar data={barData} />
      </div>
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-2">Pie Chart - Users per Role</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
}