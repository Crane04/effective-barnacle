import React from "react";
import "../css/Input.css";

interface Option {
  key: string;
  value: string;
}

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder?: string;
  options?: Option[]; // used only for select
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  options = [],
  required = true,
}) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      {type === "select" ? (
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.value}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

export default Input;
