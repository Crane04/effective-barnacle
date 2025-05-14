import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/LenderLoans.css";

interface Loan {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
  };
  amount: number;
  purpose: string;
  duration_months: number;
  status: string;
  credit_score: number | null;
  submitted_at: string;
}

const LenderLoanPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get("/api/loans/lender/", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setLoans(response.data);
      } catch (err) {
        setError("Failed to fetch loan applications");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user?.token]);

  const handleReview = (loanId: number) => {
    navigate(`/loans/lender/${loanId}/review`);
  };

  if (loading) return <div>Loading loan applications...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="lender-loan-container">
      <h2>Loan Applications</h2>

      {loans.length === 0 ? (
        <p>No loan applications to review.</p>
      ) : (
        <div className="loan-table">
          <table>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Term</th>
                <th>Credit Score</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.user.username}</td>
                  <td>${loan.amount.toLocaleString()}</td>
                  <td>{loan.purpose}</td>
                  <td>{loan.duration_months} months</td>
                  <td>{loan.credit_score || "N/A"}</td>
                  <td>
                    <span
                      className={`status-badge ${loan.status.toLowerCase()}`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleReview(loan.id)}
                      className="review-btn"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LenderLoanPage;
