import React, { useEffect, useState } from "react";
import getRequest from "../../api/getRequest";
import putRequest from "../../api/putRequest";
import Input from "../Input";
import Button from "../Button";
import type { BoolFields, FieldLabels } from "../../types";

const FinancialBehaviorForm: React.FC = () => {
  const [formData, setFormData] = useState({
    uses_budget: "",
    financial_tracking: "",
    goal_actions: "",
    investment_frequency: "",
    financial_planning: "",
    preferred_investments: "",
    risk_preference_gain: "",
    risk_preference_loss: "",
  });

  const boolFields: BoolFields = {
    investment_frequency: [
      { key: "", value: "" },
      { key: "Never", value: "Never" },
      { key: "Sometimes", value: "Sometimes" },
      { key: "Always", value: "Always" },
    ],
    uses_budget: [
      { key: "", value: "" },
      { key: "No", value: "No" },
      { key: "Don't know", value: "Don't know" },
      { key: "Yes", value: "Yes" },
    ],
    financial_tracking: [
      { key: "", value: "" },
      { key: "No", value: "No" },
      { key: "Don't know", value: "Don't know" },
      { key: "Yes", value: "Yes" },
    ],
    goal_actions: [
      { key: "", value: "" },
      { key: "No Action Taken", value: "No Action Taken" },
      { key: "Hidden Savings", value: "Hidden Savings" },
      { key: "Received Help", value: "Received Help" },
      { key: "Reduced Spending", value: "Reduced Spending" },
      { key: "Informal Savings", value: "Informal Savings" },
      { key: "Borrowed (Informal)", value: "Borrowed (Informal)" },
      { key: "Formal Savings", value: "Formal Savings" },
      { key: "Borrowed (Formal)", value: "Borrowed (Formal)" },
      { key: "Extra Work", value: "Extra Work" },
      { key: "Sold Livestock", value: "Sold Livestock" },
      { key: "Sold Other Assets", value: "Sold Other Assets" },
      { key: "Credit-based Spending", value: "Credit-based Spending" },
      { key: "Others", value: "Others" },
      { key: "No Response", value: "No Response" },
    ],
    financial_planning: [
      { key: "", value: "" },
      { key: "Agree", value: "Agree" },
      { key: "Strongly Agree", value: "Strongly Agree" },
      { key: "Neutral", value: "Neutral" },
      { key: "Disagree", value: "Disagree" },
      { key: "Strongly Disagree", value: "Strongly Disagree" },
    ],
    preferred_investments: [
      { key: "", value: "" },
      { key: "Physical Assets", value: "Physical Assets" },
      { key: "Capital Markets", value: "Capital Markets" },
      { key: "No Response", value: "No Response" },
    ],
    risk_preference_gain: [
      { key: "", value: "" },
      { key: "Sure Gain", value: "Sure Gain" },
      { key: "Risky Gain", value: "Risky Gain" },
      { key: "No Response", value: "No Response" },
    ],
    risk_preference_loss: [
      { key: "", value: "" },
      { key: "Sure Loss", value: "Sure Loss" },
      { key: "Risky Loss", value: "Risky Loss" },
      { key: "No Response", value: "No Response" },
    ],
  };
  const fieldLabels: FieldLabels = {
    uses_budget: "Do you use a household or personal budget?",
    financial_tracking: "Do you track your spending or income?",
    goal_actions: "What actions do you take to achieve your financial goals?",
    investment_frequency: "How often do you invest money?",
    financial_planning:
      "To what extent do you agree: You plan ahead financially?",
    preferred_investments: "What type of investments do you prefer?",
    risk_preference_gain: "What is your risk preference when expecting gains?",
    risk_preference_loss: "What is your risk preference when facing losses?",
  };
  useEffect(() => {
    getRequest("/user-info/financial-behavior/").then(setFormData);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await putRequest("/user-info/financial-behavior/", formData);
    alert("Saved!");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {Object.entries(formData).map(([key, value]) => (
        <Input
          key={key}
          label={
            fieldLabels[key] ||
            key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
          }
          type={boolFields[key] ? "select" : "text"}
          name={key}
          value={value}
          onChange={handleChange}
          placeholder={
            boolFields[key] ? undefined : `Enter ${key.replace(/_/g, " ")}`
          }
          options={boolFields[key]}
        />
      ))}
      <Button variant="secondary" type="submit">
        Save
      </Button>
    </form>
  );
};

export default FinancialBehaviorForm;
