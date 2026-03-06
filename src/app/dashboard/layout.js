"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-100">

        <Sidebar />

        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="p-6 overflow-y-auto bg-gray-100">{children}</main>
        </div>

      </div>
    </AuthGuard>
  );
}