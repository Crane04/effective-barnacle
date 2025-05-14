import React, { useEffect, useState } from "react";
import getRequest from "../../api/getRequest";
import putRequest from "../../api/putRequest";
import Input from "../Input";
import Button from "../Button";
import type { BoolFields, FieldLabels } from "../../types";

const IncomeProfileForm: React.FC = () => {
  const [formData, setFormData] = useState({
    marital_status: "",
    gender: "",
    age: "",
    has_disability: "",
  });

  const boolFields: BoolFields = {
    marital_status: [
      { key: "", value: "" },
      { key: "Refused to answer", value: "Refused to answer" },
      { key: "Married (Monogamy)", value: "Married (Monogamy)" },
      { key: "Never married", value: "Never married" },
      { key: "Widowed", value: "Widowed" },
      { key: "Married (Polygamy)", value: "Married (Polygamy)" },
      { key: "Separated", value: "Separated" },
      { key: "Divorced", value: "Divorced" },
      {
        key: "Co-Habiting/living together",
        value: "Co-Habiting/living together",
      },
    ],
    gender: [
      { key: "", value: "" },
      { key: "Male", value: "Male" },
      { key: "Female", value: "Female" },
    ],
    has_disability: [
      { key: "", value: "" },
      { key: "No", value: "No" },
      { key: "Yes", value: "Yes" },
    ],
  };

  const fieldLabels: FieldLabels = {
    has_disability: "Does anyone in your household have a disability?",
    marital_status: "What is your marital status?",
    gender: "What is your gender?",
    age: "How old are you?",
  };

  useEffect(() => {
    getRequest("/user-info/demographics/").then(setFormData);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await putRequest("/user-info/demographics/", formData);
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

export default IncomeProfileForm;
