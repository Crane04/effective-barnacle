import React, { useState } from "react";
import axios from "axios";
import "../css/CreditScore.css";
import getRequest from "../api/getRequest";

interface CreditScoreResponse {
  credit_score?: number;
  status?: string;
  error?: string;
  missing_fields?: string[];
}

const CreditScore: React.FC = () => {
  const token = localStorage.getItem("access");
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const calculateCreditScore = async () => {
    setLoading(true);
    setError(null);
    setMissingFields([]);

    try {
      const data = await getRequest<CreditScoreResponse>(
        "/user-info/credit-score/"
      );

      if (data.credit_score !== undefined) {
        setScore(data.credit_score);
      } else if (data.missing_fields) {
        setMissingFields(data.missing_fields);
        setError("Please complete your profile information");
      } else {
        setError(data.error || "Unable to calculate credit score");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.missing_fields) {
          setMissingFields(err.response.data.missing_fields);
          setError("Please complete all required profile information");
        } else {
          setError(
            err.response?.data?.error || "Error calculating credit score"
          );
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatFieldName = (field: string): string => {
    return field
      .replace(/_/g, " ")
      .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
  };

  return (
    <div className="credit-score-container">
      <h2>Credit Score</h2>

      <div className="credit-score-card">
        {score !== null ? (
          <>
            <div className="score-display">
              <div className="score-value">{score}</div>
              <div className="score-label">out of 100</div>
            </div>
            <div className="score-description">
              {score >= 80 && (
                <p>Excellent! You have great financial health.</p>
              )}
              {score >= 60 && score < 80 && (
                <p>Good financial standing with room for improvement.</p>
              )}
              {score < 60 && <p>Consider improving your financial habits.</p>}
            </div>
          </>
        ) : (
          <div className="score-prompt">
            <p>
              Get your personalized credit score based on your financial profile
            </p>
          </div>
        )}
      </div>

      <button
        onClick={calculateCreditScore}
        disabled={loading}
        className="calculate-btn"
      >
        {loading ? "Calculating..." : "Calculate My Score"}
      </button>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          {missingFields.length > 0 && (
            <ul className="missing-fields">
              {missingFields.map((field) => (
                <li key={field}>{formatFieldName(field)} is required</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="score-info">
        <h3>How your score is calculated:</h3>
        <ul>
          <li>Income and employment stability</li>
          <li>Debt and credit management</li>
          <li>Financial behaviors and habits</li>
          <li>Mobile money usage patterns</li>
        </ul>
      </div>
    </div>
  );
};

export default CreditScore;