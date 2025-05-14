import React, { useEffect, useState } from "react";
import getRequest from "../../api/getRequest";
import putRequest from "../../api/putRequest";
import Input from "../Input";
import Button from "../Button";
import type { BoolFields, FieldLabels } from "../../types";

const HouseholdForm: React.FC = () => {
  const [formData, setFormData] = useState({
    business_employees: "",
    monthly_income: "",
    avg_amount_received: "",
    avg_amount_sent: "",
    main_income_source: "",
    income_sector: "",
  });

  const boolFields: BoolFields = {
    has_disability: [
      { key: "Yes", value: "Yes, I have a disability" },
      { key: "No", value: "No, I don't have a disability" },
    ],
    main_income_source: [
      { key: "", value: "" },
      {
        key: "Family Support (Non-student)",
        value: "Family Support (Non-student)",
      },
      { key: "Family Support (Student)", value: "Family Support (Student)" },
      { key: "Subsistence Farming", value: "Subsistence Farming" },
      { key: "Non-farming Business", value: "Non-farming Business" },
      { key: "Service Business", value: "Service Business" },
      { key: "Informal Employment", value: "Informal Employment" },
      {
        key: "Formal Employment (Business)",
        value: "Formal Employment (Business)",
      },
      { key: "Family Support (Retired)", value: "Family Support (Retired)" },
      { key: "Government Salary", value: "Government Salary" },
      { key: "Manual Labour", value: "Manual Labour" },
      { key: "Large Scale Farming", value: "Large Scale Farming" },
      { key: "Farming Business", value: "Farming Business" },
      {
        key: "Agricultural Inputs Business",
        value: "Agricultural Inputs Business",
      },
      { key: "Investment Income", value: "Investment Income" },
      { key: "Government Grant", value: "Government Grant" },
      { key: "Rental Income", value: "Rental Income" },
      { key: "Pension", value: "Pension" },
      { key: "Interest Income", value: "Interest Income" },
      { key: "Relief Aid", value: "Relief Aid" },
      { key: "Others", value: "Others" },
    ],
    income_sector: [
      { key: "", value: "" },
      { key: "Not Applicable", value: "Not Applicable" },
      { key: "Agriculture", value: "Agriculture" },
      { key: "Trade", value: "Trade" },
      { key: "Artisan", value: "Artisan" },
      { key: "Education", value: "Education" },
      { key: "Manufacturing", value: "Manufacturing" },
      { key: "Mining", value: "Mining" },
      { key: "Repair Services", value: "Repair Services" },
      { key: "Transport", value: "Transport" },
      { key: "Arts & Entertainment", value: "Arts & Entertainment" },
      { key: "Professional Services", value: "Professional Services" },
      { key: "Health & Social Work", value: "Health & Social Work" },
      { key: "Admin Services", value: "Admin Services" },
      { key: "Construction", value: "Construction" },
      { key: "Hospitality", value: "Hospitality" },
      { key: "Waste & Water Services", value: "Waste & Water Services" },
      { key: "ICT", value: "ICT" },
      { key: "Utilities", value: "Utilities" },
      { key: "Finance", value: "Finance" },
      { key: "Real Estate", value: "Real Estate" },
      { key: "Others", value: "Others" },
    ],
  };

  const fieldLabels: FieldLabels = {
    main_income_source: "Main source of household income",
    income_sector: "Which sector does your income come from?",
    business_employees: "How many people do you employ in your business?",
    monthly_income: "What is your total personal monthly income?",
    avg_amount_received: "On Average, how much money do you receive monthly?",
    avg_amount_sent: "On Average, how much money do you send out monthly?",
  };

  useEffect(() => {
    getRequest("/user-info/employment/").then(setFormData);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await putRequest("/user-info/employment/", formData);
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

export default HouseholdForm;
