"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      
      <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-700 mb-8 text-center drop-shadow-lg">
        Eyego Dashboard
      </h1>
      
      <p className="text-lg sm:text-xl text-blue-800 mb-6 text-center">
        Welcome! Please login to access the admin dashboard.
      </p>

      <button
        onClick={() => router.push("/login")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Login as Admin
      </button>
    </div>
  );
}