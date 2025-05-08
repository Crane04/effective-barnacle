import React, { useState } from "react";
import Input from "../components/Input";
import "../css/AuthPage.css";
import AuthImagePanel from "../components/AuthImagePanel";
import Button from "../components/Button";

console.log(import.meta.env.VITE_API_URL);

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    organizationName: "",
    userType: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    return;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup data:", formData);
  };
//  
  return (
    <div className="auth-container">
      <AuthImagePanel />
      <div className="auth-form-section">
        <div className="auth-form-box">
          <center>
            <h2>Sign Up</h2>
          </center>

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
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
            />
            <Input
              label="Organization Name (Optional)"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="doe inc."
            />
            <Input
              label="Phone Number"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+234 123 4567 910"
            />
            <Input
              label="User Type"
              type="select"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              placeholder="Choose user type"
              options={[
                { key: "organization", value: "Organization" },
                { key: "user", value: "Farmer" },
              ]}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="*******"
            />
            <Input
              label="Confirm Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="*******"
            />

            <Button variant="secondary" type="submit">
              Join Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
