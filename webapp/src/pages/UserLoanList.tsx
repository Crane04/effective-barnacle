import React, { useState, useEffect } from "react";

import api from "../helpers/axios";
import "../css/LoanList.css";

interface Loan {
  id: number;
  amount: number;
  purpose: string;
  duration_months: number;
  status: string;
  credit_score: number | null;
  submitted_at: string;
}

const UserLoanList: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await api.get("/api/loans/user/", {});
        setLoans(response.data);
      } catch (err) {
        setError("Failed to fetch loan applications");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "status-approved";
      case "rejected":
        return "status-rejected";
      default:
        return "status-pending";
    }
  };

  if (loading) return <div>Loading your loan applications...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="loan-list-container">
      <h2>Your Loan Applications</h2>

      {loans.length === 0 ? (
        <p>You haven't applied for any loans yet.</p>
      ) : (
        <div className="loan-cards">
          {loans.map((loan) => (
            <div key={loan.id} className="loan-card">
              <div className="loan-header">
                <h3>${loan.amount.toLocaleString()}</h3>
                <span className={`status-badge ${getStatusColor(loan.status)}`}>
                  {loan.status}
                </span>
              </div>

              <div className="loan-details">
                <p>
                  <strong>Purpose:</strong> {loan.purpose}
                </p>
                <p>
                  <strong>Term:</strong> {loan.duration_months} months
                </p>
                <p>
                  <strong>Credit Score:</strong> {loan.credit_score || "N/A"}
                </p>
                <p>
                  <strong>Applied:</strong>{" "}
                  {new Date(loan.submitted_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserLoanList;
