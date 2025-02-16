import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const handleStudentFacultyClick = () => {
    navigate("/register-student-faculty");
  };

  const handleRegularUserClick = () => {
    navigate("/register-regular-user");
  };

  const handleCompanyClick = () => {
    navigate("/register-company");
  };

  return (
    <div className="register-page">
      <div className="register-wrapper">
        <div className="register-container">
          <h1>Register With Us</h1>
          <div className="register-options">
            <div className="register-card" onClick={handleStudentFacultyClick}>
              <h2>Register as a Student / Faculty</h2>
              <p>
                Students can rate various categories like textbooks, classes,
                schools, movies, and more. Faculty members can rate selected
                categories like textbooks, online resources, and articles.
              </p>
            </div>
            <div className="register-card" onClick={handleRegularUserClick}>
              <h2>Register as a Regular User</h2>
              <p>Regular users can review entertainment categories.</p>
            </div>
            <div className="register-card" onClick={handleCompanyClick}>
              <h2>Register as a Company</h2>
              <p>
                Companies can list their products for reviews and offer rewards
                for regular users.
              </p>
            </div>
          </div>
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
