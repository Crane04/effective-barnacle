import React from "react";
import "../css/Button.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) => {
  return (
    <button className={`btn ${variant}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
