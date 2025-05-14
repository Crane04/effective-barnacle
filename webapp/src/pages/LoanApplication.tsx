import React, { useState } from "react";
import api from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import "../css/LoanApplication.css";

const LoanApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    duration_months: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/api/loans/user/", formData);

      if (response.status === 201) {
        navigate("/loans/user");
      }
    } catch (err) {
      setError("Failed to submit loan application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loan-application-container">
      <h2>Apply for a Loan</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <Input
          label="Loan Amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
        />

        <Input
          label="Loan Purpose"
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="Describe why you need this loan"
        />

        <Input
          label="Duration (months)"
          type="number"
          name="duration_months"
          value={formData.duration_months}
          onChange={handleChange}
          placeholder="Loan term in months"
        />

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default LoanApplicationPage;
