import React, { useState } from "react";
import Input from "../components/Input";
import "../css/AuthPage.css";
import AuthImagePanel from "../components/AuthImagePanel";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorDisplay from "../components/ErrorDisplay";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<object>({});

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    organization_name: "",
    user_type: "",
    phone_number: "",
    fullname: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({}); // Clear previous errors

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError({ password: "Passwords don't match!" });
      return;
    }

    // Basic validation
    if (!formData.email || !formData.password || !formData.username) {
      setError({ general: "Please fill in all required fields" });
      return;
    }

    try {
      const response = await signUp(formData);

      console.log(response);
      if (response?.id) {
        alert("Account created successfully!");
        navigate("/signin");
      } else if (response?.errors) {
        // Handle API validation errors
        setError(response.errors);
      } else {
        setError({ general: "Signup failed. Please try again." });
      }
    } catch (err: any) {
      console.error("Signup error:", err);

      if (err.response?.data?.errors) {
        // Handle structured error response from API
        setError(err.response.data.errors);
      } else if (err.message) {
        // Handle general error message
        setError({ general: err.message });
      } else {
        setError({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    }
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
            {/* <Input
              label="Fullname"
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="John Doe"
            /> */}
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
              name="organization_name"
              value={formData.organization_name}
              onChange={handleChange}
              placeholder="doe inc."
              required={false}
            />
            <Input
              label="Phone Number"
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="+234 123 4567 910"
            />
            <Input
              label="User Type"
              type="select"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              placeholder="Choose user type"
              options={[
                { key: "lender", value: "Organization" },
                { key: "user", value: "User" },
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
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="*******"
            />
            <p style={{color: "#fff"}}>
              Have an account? <Link to={"/signin"} style={{color:"#f39c12"}}>Sign In</Link>
            </p>
            <ErrorDisplay errors={error} />
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
