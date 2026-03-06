"use client";

import { useState, useEffect } from "react";

import StatsCards from "@/components/dashboard/StatsCards";
import RecentUsers from "@/components/dashboard/RecentUsers";
import ActiveUsersChart from "./charts/ActiveUsersChart";
import UsersRoleChart from "./charts/UsersRoleChart";
import UsersTable from './users/page';


export default function DashboardPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-100 ">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <StatsCards users={users} />

      {/* Charts */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-4 rounded shadow flex flex-col items-center">
          <h3 className="font-bold mb-4 text-lg sm:text-xl">Active vs Inactive Users</h3>
          <ActiveUsersChart users={users} />
        </div>

        <div className="bg-white p-4 rounded shadow ">
          <h3 className="font-bold mb-4 text-lg sm:text-xl">Users per Role</h3>
          <UsersRoleChart users={users} />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white p-4 rounded shadow mb-10 overflow-x-auto">
        <UsersTable users={users} />
      </div>

      {/* Recent Users */}
      <RecentUsers users={users} />
    </div>
  );
}