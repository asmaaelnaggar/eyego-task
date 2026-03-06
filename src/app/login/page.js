"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/authService";
import { loginSuccess } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      dispatch(loginSuccess({ user: data.user }));
      alert("Login Successful");
      router.push("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Admin Login</h2>
        <p className="text-center text-gray-600">Enter your credentials to access the dashboard</p>

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          Login
        </button>

        <p className="text-center text-gray-500 text-sm mt-2">
          Forgot your password? <span className="text-blue-600 cursor-pointer hover:underline">Reset</span>
        </p>
      </form>
    </div>
  );
}