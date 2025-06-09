import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login"; // ✅ keep this if your file is Login.jsx

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
