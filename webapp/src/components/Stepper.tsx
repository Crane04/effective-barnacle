// Stepper.tsx
import React from "react";
import "../css/Stepper.css";

const steps = [
  "Demographics",
  "Household",
  "Financial Behavior",
  "Living Situation",

  "Health",
  "Mobile Money",
];

type Props = {
  currentStep: number;
  onStepClick: (index: number) => void;
};

const Stepper: React.FC<Props> = ({ currentStep, onStepClick }) => {
  return (
    <div className="stepper">
      {steps.map((label, idx) => (
        <div
          key={idx}
          className={`step ${idx === currentStep ? "active" : ""}`}
          onClick={() => onStepClick(idx)}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
