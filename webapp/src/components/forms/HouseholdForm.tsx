import React, { useEffect, useState } from "react";
import getRequest from "../../api/getRequest";
import putRequest from "../../api/putRequest";
import Input from "../Input";
import Button from "../Button";
import type { BoolFields, FieldLabels } from "../../types";

const HouseholdForm: React.FC = () => {
  const [formData, setFormData] = useState({
    household_size: "",
    adults_count: "",
    ownership_status: "",
    house_acquisition: "",
    household_assets: "",
    financial_decision_maker: "",
    has_unemployed: "",
  });

  const boolFields: BoolFields = {
    has_unemployed: [
      { key: "Yes", value: "Yes" },
      { key: "No", value: "No" },
    ],
    ownership_status: [
      { key: "", value: "" },
      { key: "Own A house", value: "Own A house" },
      { key: "Live Free", value: "Live Free" },
      { key: "Rent A House", value: "Rent A House" },
      { key: "Dont Know", value: "Dont Know" },
    ],
    house_acquisition: [
      { key: "", value: "Select..." },
      { key: "Not Applicable", value: "Not Applicable" },
      { key: "Inheritance", value: "Inherited" },
      { key: "Own savings", value: "Bought with savings" },
      { key: "Mortgage", value: "Mortgage" },
      { key: "Refused to answer", value: "Refused to answer" },
      { key: "A loan from other sources", value: "A loan from other sources" },
      {
        key: "A loan from government scheme",
        value: "A loan from government scheme",
      },
      { key: "Other", value: "Other" },
      { key: "Dont Know", value: "Dont Know" },
    ],
    financial_decision_maker: [
      { key: "", value: "" },
      { key: "Spouse", value: "Spouse" },
      { key: "Parents", value: "Parents" },
      { key: "Myself", value: "Myself" },
      { key: "Siblings", value: "Siblings" },
      { key: "Myself with someone else", value: "Myself with someone else" },
      { key: "Children", value: "Children" },
      { key: "Other relatives", value: "Other relatives" },
      { key: "All adults", value: "All adults" },
      { key: "Non-relatives", value: "Non-relatives" },
    ],
    household_assets: [
      { key: "", value: "" },
      { key: "One mattress", value: "One mattress" },
      { key: "Three or more mattresses", value: "Three or more mattresses" },
      { key: "Two mattresses", value: "Two mattresses" },
      { key: "Telephone (mobile)", value: "Telephone (mobile)" },
      { key: "Colour TV", value: "Colour TV" },
      { key: "Music system", value: "Music system" },
      {
        key: "Air Conditioning (single unit)",
        value: "Air Conditioning (single unit)",
      },
      { key: "Black & white TV", value: "Black & white TV" },
      { key: "Washing machine", value: "Washing machine" },
      { key: "Fridge/deep freezer", value: "Fridge/deep freezer" },
      { key: "Microwave", value: "Microwave" },
      { key: "Motorbike", value: "Motorbike" },
      { key: "Computer (laptop)", value: "Computer (laptop)" },
      { key: "Keke Napep", value: "Keke Napep" },
      { key: "Telephone (land)", value: "Telephone (land)" },
      { key: "Household help", value: "Household help" },
    ],
  };

  const fieldLabels: FieldLabels = {
    household_size: "Total number of people in your household",
    adults_count: "Number of adults (18+ years) in household",
    ownership_status: "Do you or your family own or rent your home?",
    house_acquisition: "How did you acquire your house?",
    household_assets:
      "Which is these do your household have? (Pick most important)",
    financial_decision_maker:
      "Who makes most financial decisions in your household?",

    has_unemployed: "Do you have an unemployed member in your household?",
  };
  useEffect(() => {
    getRequest("/user-info/household/").then(setFormData);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await putRequest("/user-info/household/", formData);
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
