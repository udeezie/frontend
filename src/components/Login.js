import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const { data, status } = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      if (status === 200) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "An error occurred. Please try again."
      );
      console.error(
        error.response?.data?.error || "An error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="login-page">
        <div className="login-container">
          <h1>
            <FaSignInAlt className="login-icon" /> Welcome.
            <br />
            Let's Login.
          </h1>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <small>We'll never share your email with anyone else.</small>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p>
            No account?{" "}
            <a href="/register" className="register-link">
              Let's Register <FaUserPlus />
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
