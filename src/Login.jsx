import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(45deg,white_50%,#c084fc_50%)]">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
        <input
          type="email"
          placeholder="email address"
          className="w-full px-4 py-3 mb-5 rounded-xl shadow-inner border focus:outline-none placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="password"
          className="w-full px-4 py-3 mb-6 rounded-xl shadow-inner border focus:outline-none placeholder-gray-400"
        />
        <button className="w-full py-3 rounded-full bg-purple-500 text-white font-semibold shadow-lg hover:bg-purple-600 transition">
          LOGIN
        </button>
        <div className="text-center mt-6">
          <Link to="/signup" className="text-purple-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}