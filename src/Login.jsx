import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login button clicked");
    console.log("Email:", email);
    console.log("Password:", password);

    if (email === "yossafikkene@gmail.com" && password === "Montage") {
      console.log("Credentials match, navigating to welcome");
      navigate("/welcome");
    } else {
      console.log("Invalid credentials");
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(45deg,white_50%,#c084fc_50%)]">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
        <div>
          <input
            type="email"
            placeholder="email address"
            className="w-full px-4 py-3 mb-5 rounded-xl shadow-inner border focus:outline-none placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="w-full px-4 py-3 mb-6 rounded-xl shadow-inner border focus:outline-none placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          <button 
            onClick={handleLogin}
            className="w-full py-3 rounded-full bg-purple-500 text-white font-semibold shadow-lg hover:bg-purple-600 transition"
          >
            LOGIN
          </button>
        </div>
        <div className="text-center mt-6">
          <Link to="#" className="text-purple-600 hover:underline cursor-not-allowed">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}