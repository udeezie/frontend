import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import RegisterRegularUser from "./components/RegisterRegularUser";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import RewardsTable from "./components/RewardsTable";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-regular-user" element={<RegisterRegularUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rewards" element={<RewardsTable />} /> 
      </Routes>
    </Router>
  );
}

export default App;
