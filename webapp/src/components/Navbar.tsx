import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h2>AgriMonie</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/features">Features</Link>
        <Link to="/how-it-works">How It Works</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/signin">Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
