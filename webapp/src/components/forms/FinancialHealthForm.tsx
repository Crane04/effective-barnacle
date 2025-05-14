import React, { useEffect, useState } from "react";
import getRequest from "../../api/getRequest";
import putRequest from "../../api/putRequest";
import Input from "../Input";
import Button from "../Button";

const FinancialHealthForm: React.FC = () => {
  const [formData, setFormData] = useState({
    finhealth: "",
    finneeds: "",
    credit_activities: "",
    debt_manageability: "",
    borrowed_airtime: "",
    cash_shortage_frequency: "",
    emergency_fund_access: "",
  });
  interface BoolFieldOption {
    key: string;
    value: string;
  }

  interface BoolFields {
    [key: string]: BoolFieldOption[];
  }

  interface FieldLabels {
    [key: string]: string;
  }
  const boolFields: BoolFields = {
    finneeds: [
      { key: "", value: "" },
      { key: "Financial Goals", value: "Financial Goals" },
      { key: "Liquidity Distress", value: "Liquidity Distress" },
      { key: "Liquidity", value: "Liquidity" },
      { key: "Resilience", value: "Resilience" },
      {
        key: "Transfer of Value - Income",
        value: "Transfer of Value - Income",
      },
      {
        key: "Transfer of Value - Cash Income",
        value: "Transfer of Value - Cash Income",
      },
      {
        key: "Transfer of Value - Digital Income",
        value: "Transfer of Value - Digital Income",
      },
    ],
    borrowed_airtime: [
      { key: "", value: "" },
      { key: "No", value: "No" },
      { key: "Yes", value: "Yes" },
    ],

    finhealth: [
      { key: "", value: "" },
      { key: "Spending", value: "Spending" },
      { key: "Saving", value: "Saving" },
      { key: "Planning", value: "Planning" },
      { key: "Resilience", value: "Resilience" },
      { key: "Indicator", value: "Indicator" },
      { key: "Access", value: "Access" },
      { key: "Not Applicable", value: "Not Applicable" },
    ],
    credit_activities: [
      { key: "", value: "" },
      { key: "Borrowed", value: "Borrowed" },
      { key: "Credit Purchase", value: "Credit Purchase" },
      { key: "No Response", value: "No Response" },
    ],
    debt_manageability: [
      { key: "", value: "" },
      { key: "Manageable Debt", value: "Manageable Debt" },
      { key: "No Debt", value: "No Debt" },
      { key: "Unmanageable Debt", value: "Unmanageable Debt" },
      { key: "No Response", value: "No Response" },
    ],
    cash_shortage_frequency: [
      { key: "", value: "" },
      { key: "Never", value: "Never" },
      { key: "Frequent", value: "Frequent" },
      { key: "Monthly", value: "Monthly" },
      { key: "Once", value: "Once" },
    ],
    emergency_fund_access: [
      { key: "", value: "" },
      { key: "Very Difficult", value: "Very Difficult" },
      { key: "Not Difficult", value: "Not Difficult" },
      { key: "Somewhat Difficult", value: "Somewhat Difficult" },
      { key: "No Response", value: "No Response" },
      { key: "Dont Know", value: "Dont Know" },
    ],
  };
  const fieldLabels: FieldLabels = {
    finhealth: "How would you rate your current financial health?",
    finneeds: "What are your current financial needs?",

    credit_activities: "What credit activities have you engaged in?",
    debt_manageability: "How manageable is your current debt?",
    borrowed_airtime: "Have you borrowed airtime before?",

    cash_shortage_frequency: "How often do you experience cash shortages?",
    emergency_fund_access:
      "How difficult to come up with N75,000 within the next 7 days?",
  };
  useEffect(() => {
    getRequest("/user-info/financial-health/").then(setFormData);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await putRequest("/user-info/financial-health/", formData);
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

export default FinancialHealthForm;
