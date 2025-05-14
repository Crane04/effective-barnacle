import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../helpers/axios";
import Input from "../components/Input";
import "../css/LoanReview.css";

const LoanReviewPage: React.FC = () => {
  const { loanId } = useParams<{ loanId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loan, setLoan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("pending");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await api.get(`/api/loans/lender/${loanId}/`, {});
        setLoan(response.data);
        setStatus(response.data.status);
      } catch (err) {
        setError("Failed to fetch loan details");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [loanId, user?.token]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.patch(`/api/loans/lender/${loanId}/review/`, { status }, {});
      navigate("/loans/lender");
    } catch (err) {
      setError("Failed to update loan status");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading loan details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!loan) return <div>Loan not found</div>;

  return (
    <div className="loan-review-container">
      <h2>Review Loan Application</h2>

      <div className="loan-details">
        <h3>Loan Details</h3>
        <p>
          <strong>Applicant:</strong> {loan.user.username}
        </p>
        <p>
          <strong>Amount:</strong> ${loan.amount.toLocaleString()}
        </p>
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

      <form onSubmit={handleSubmit} className="review-form">
        <Input
          label="Decision"
          type="select"
          name="status"
          value={status}
          onChange={handleStatusChange}
          options={[
            { key: "pending", value: "Pending" },
            { key: "approved", value: "Approve" },
            { key: "rejected", value: "Reject" },
          ]}
        />

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/loans/lender")}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="submit-btn">
            {submitting ? "Submitting..." : "Submit Decision"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanReviewPage;
