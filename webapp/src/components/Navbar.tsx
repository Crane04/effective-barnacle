import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate("/signin", { replace: true }); // Redirect to signin page
  };

  return (
    <nav className="navbar">
      <h2>AgriMonie</h2>
      <div className="nav-links">
        {user?.online && <Link to="/home">Home</Link>}
        {user?.online && <Link to="/score">Credit Score</Link>}
        {user?.online && <Link to="/profile">Profile</Link>}
        <Link to="/dashboard">Dashboard</Link>
        {!user?.online ? (
          <Link to="/signin">Sign In</Link>
        ) : (
          <span onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;