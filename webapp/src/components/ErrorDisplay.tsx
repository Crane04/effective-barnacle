import React from "react";

// interface ErrorResponse {
//   [key: string]: string[] | string;
// }
// interface ErrorDisplayProps {
//   errors: ErrorResponse;
// }

// interface ErrorDisplayProps {
//   errors: ErrorResponse;
// }

const ErrorDisplay: React.FC<any> = ({ errors }) => {
  if (!errors) return null;

  return (
    <div className="error-container">
      {Object.entries(errors).map(([field, messages]: any) => (
        <div key={field} className="error-field">
          {Array.isArray(messages) ? (
            messages.map((message, index) => (
              <p key={index} className="error-message">
                {message}
              </p>
            ))
          ) : (
            <p className="error-message">{messages}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ErrorDisplay;
