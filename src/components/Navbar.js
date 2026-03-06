"use client";

import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {

      await fetch("/api/logout", {
        method: "POST",
      });

      dispatch(logout());

      router.push("/login");

    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">

      <h1 className="font-bold text-lg">Dashboard</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
      >
        Logout
      </button>

    </div>
  );
}