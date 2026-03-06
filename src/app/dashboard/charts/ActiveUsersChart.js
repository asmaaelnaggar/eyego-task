import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#34D399", "#F87171"]; // Green: Active, Red: Inactive

const ActiveUsersChart = ({ users }) => {
  const activeCount = users.filter((u) => u.active).length;
  const inactiveCount = users.length - activeCount;

  const data = [
    { name: "Active", value: activeCount },
    { name: "Inactive", value: inactiveCount },
  ];

  return (
    <PieChart width={300} height={300} >
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
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
  );
};

export default ActiveUsersChart;