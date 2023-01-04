import React from "react";

const Button = ({ className, type, onClick, disabled, children }) => {
  return (
    <button
      className={`border-black border-4 px-3 py-1 bg-orange-400 disabled:bg-primary-400 rounded disabled:animate-none ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
