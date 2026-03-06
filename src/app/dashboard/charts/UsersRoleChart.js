"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"]; // ألوان مختلفة لكل Role

const UsersRoleChart = ({ users }) => {
  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(roleCounts).map(([role, count]) => ({ role, count }));

  return (
    <div className="flex flex-col  gap-10 items-center justify-center">
      {/* Bar Chart */}
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="role" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#3B82F6" />
      </BarChart>

      {/* Pie Chart */}
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="role"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default UsersRoleChart;