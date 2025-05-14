import React, { useEffect, useState } from "react";
import getRequest from "../../api/getRequest";
import putRequest from "../../api/putRequest";
import Input from "../Input";
import Button from "../Button";
import type { BoolFields, FieldLabels } from "../../types";
const DigitalFinanceForm: React.FC = () => {
  const [formData, setFormData] = useState({
    mobile_money_awareness: "",
    mobile_money_experience: "",
    mobile_money_frequency: "",
    mobile_money_issues: "",
    money_transfer_activities: "",
    money_send_reason: "",
    utility_bill_payments: "",
    system_downtime: "",
    digital_banking: "",
  });

  const boolFields: BoolFields = {
    mobile_money_awareness: [
      { key: "", value: "" },
      { key: "Yes", value: "Yes" },
      { key: "No", value: "No" },
    ],

    utility_bill_payments: [
      { key: "", value: "" },
      { key: "Yes", value: "Yes" },
      { key: "No", value: "No" },
    ],
    mobile_money_experience: [
      { key: "", value: "" },
      { key: "Not Applicable", value: "Not Applicable" },
      { key: "Never Used", value: "Never Used" },
      { key: "Uses Others", value: "Uses Others" },
      { key: "Account", value: "Account" },
      { key: "Registered", value: "Registered" },
      { key: "Never Used", value: "Never Used" },
      { key: "Registered User", value: "Registered User" },
    ],
    mobile_money_frequency: [
      { key: "", value: "" },
      { key: "Not Applicable", value: "Not Applicable" },
      { key: "Weekly", value: "Weekly" },
      { key: "Monthly", value: "Monthly" },
      { key: "Daily", value: "Daily" },
      { key: "Occasionally", value: "Occasionally" },
      { key: "Never Used", value: "Never Used" },
      { key: "Annually", value: "Annually" },
      { key: "Quarterly", value: "Quarterly" },
    ],
    mobile_money_issues: [
      { key: "", value: "" },
      { key: "Not Applicable", value: "Not Applicable" },
      { key: "Poor Network/Internet", value: "Poor Network/Internet" },
      { key: "Failed Transactions", value: "Failed Transactions" },
      {
        key: "Unauthorized Account Access",
        value: "Unauthorized Account Access",
      },
      { key: "High Transaction Charges", value: "High Transaction Charges" },
      { key: "Poor Complaint Resolution", value: "Poor Complaint Resolution" },
      { key: "Security/Fraud Issues", value: "Security/Fraud Issues" },
      { key: "Others", value: "Others" },
    ],
    money_transfer_activities: [
      { key: "", value: "" },
      { key: "No Activity", value: "No Activity" },
      { key: "Within Nigeria - Received", value: "Within Nigeria - Received" },
      { key: "Within Nigeria - Sent", value: "Within Nigeria - Sent" },
      {
        key: "International - Received",
        value: "International - Received",
      },
      { key: "International - Sent", value: "International - Sent" },
    ],
    money_send_reason: [
      { key: "", value: "Select a reason" },
      { key: "Trust & Familiarity", value: "Trust & Familiarity" },
      { key: "Easy to Use", value: "Easy to Use" },
      { key: "Reliable", value: "Reliable" },
      { key: "Based on Request", value: "Based on Recipient's Request" },
      { key: "Quick Service", value: "Fast Transfer" },
      { key: "No Transaction Cost", value: "No Fees" },
      { key: "Only Available Option", value: "Only Available Option" },
      { key: "Others", value: "Other Reasons" },
    ],
    system_downtime: [
      { key: "", value: "Select an option" }, // Default empty option
      { key: "Yes", value: "Yes" },
      { key: "No", value: "No" },
      { key: "Don't know", value: "I don't know" },
    ],
    digital_banking: [
      { key: "", value: "" },
      { key: "Yes", value: "Yes" },
      { key: "No", value: "No" },
      { key: "Don't know", value: "Don't know" },
    ],
  };

  const fieldLabels: FieldLabels = {
    mobile_money_awareness: "Are you aware of mobile money services?",
    mobile_money_experience: "Which best describes your mobile money usage?",
    utility_bill_payments: "Do you regularly pay utility bills?",
    system_downtime:
      "Have you experienced system downtime when accessing services?",
    digital_banking:
      "Do you Use Mobile Phone/Tablets to Manage Financial Activities?",
    mobile_money_frequency: "How often do you use mobile money?",
    mobile_money_issues: "Issues experienced with mobile money (if any)",
    money_transfer_activities:
      "Types of money transfer activities you’ve done recently",
    money_send_reason: "What influences your choice of money transfer method?",
  };
  useEffect(() => {
    getRequest("/user-info/digital-finance/").then(setFormData);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await putRequest("/user-info/digital-finance/", formData);
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

export default DigitalFinanceForm;
