import React from "react";
import { FaChartLine, FaLeaf, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import "../css/AuthImagePanel.css";

const AuthImagePanel: React.FC = () => {
  return (
    <div className="auth-image">
      <h1>
        The Future of <span className="highlight">Agricultural</span> <br />
        Credit Assessment
      </h1>
      <p className="tagline">
        Empowering farmers with data-driven credit insights.
      </p>

      <div className="features-list">
        <div className="feature-item">
          <FaChartLine className="icon" />
          <div>
            <strong>Smart Credit Scoring</strong>
            <p className="feature-description">
              Assess farmer creditworthiness using advanced AI models.
            </p>
          </div>
        </div>
        <div className="feature-item">
          <FaLeaf className="icon" />
          <div>
            <strong>Crop-Specific Analytics</strong>
            <p className="feature-description">
              Understand trends and patterns based on region and crop type.
            </p>
          </div>
        </div>
        <div className="feature-item">
          <FaMobileAlt className="icon" />
          <div>
            <strong>Mobile Assessment Tools</strong>
            <p className="feature-description">
              Capture and validate farmer data in real-time from the field.
            </p>
          </div>
        </div>
        <div className="feature-item">
          <FaShieldAlt className="icon" />
          <div>
            <strong>Risk Management</strong>
            <p className="feature-description">
              Minimize default risks with transparent data and smart tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePanel;
