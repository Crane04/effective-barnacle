import React, { useState } from "react";
import Input from "../components/Input";
import "../css/AuthPage.css";
import AuthImagePanel from "../components/AuthImagePanel";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signin: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn(formData);
      if (response?.access) {
        localStorage.setItem("access", response?.access);
        alert("Login Successful");
        navigate("/home");
      }
    } catch (error: any) {
      if (error?.response?.data.detail) {
        alert(error?.response?.data.detail);
      }
    }
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
