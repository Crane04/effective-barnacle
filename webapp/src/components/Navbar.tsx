import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user } = useAuth();

  console.log(user);
  return (
    <nav className="navbar">
      <h2>AgriMonie</h2>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        {user?.online && <Link to="/score">Credit Score</Link>}
        {user?.online && <Link to="/profile">Profile</Link>}
        {user?.online && <Link to="/dashboard">Dashboard</Link>}
        {!user?.online ? (
          <Link to="/signin">Sign In</Link>
        ) : (
          <Link to="/signin">Logout</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
