"use client";

export default function StatsCards({ users }) {

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.active).length;
  const inactiveUsers = totalUsers - activeUsers;
  const admins = users.filter(u => u.role === "Admin").length;

  const cards = [
    { title: "Total Users", value: totalUsers, color: "bg-blue-500" },
    { title: "Active Users", value: activeUsers, color: "bg-green-500" },
    { title: "Inactive Users", value: inactiveUsers, color: "bg-red-500" },
    { title: "Admins", value: admins, color: "bg-purple-500" }
  ];

  return (
    <div className="sm:grid  sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 flex justify-center">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`${card.color} text-white p-6 rounded-xl shadow flex flex-col items-center justify-center`}
        >
          <h3 className="text-sm sm:text-base text-center">{card.title}</h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
}