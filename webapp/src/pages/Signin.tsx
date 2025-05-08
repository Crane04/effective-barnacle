import React, { useState } from "react";
import Input from "../components/Input";
import "../css/AuthPage.css";
import AuthImagePanel from "../components/AuthImagePanel";

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signin data:", formData);
  };

  return (
    <div className="auth-container">
      <AuthImagePanel />
      <div className="auth-form-section">
        <div className="auth-form-box">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="*******"
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
