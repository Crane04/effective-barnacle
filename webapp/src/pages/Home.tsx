import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import Button from "../components/Button";

const Home: React.FC = () => {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("username") || "User";
      setUser(storedUser);
    };
    fetchUser();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Hey {user} 👋</h1>
        <p>
          Welcome back to <span className="highlight">AgriMonie</span> — empowering
          financial growth for farmers and agricultural stakeholders.
        </p>
      </header>

      <section className="home-section">
        <h3>Complete Your Profile</h3>
        <p>Fill in your financial and personal data to unlock insights and eligibility recommendations.</p>
        <Link to="/profile">
          <Button variant="secondary">Go to Profile</Button>
        </Link>
      </section>

      <section className="home-section">
        <h3>Get Personalized Insights</h3>
        <p>Understand how your financial profile affects your access to agricultural credit.</p>
        <Link to="/insights">
          <Button variant="secondary">View Insights</Button>
        </Link>
      </section>

      <section className="home-section">
        <h3>Start Assessment</h3>
        <p>Begin your step-by-step financial profiling to get matched with financial support.</p>
        <Link to="/wizard">
          <Button variant="secondary">Start Assessment</Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;