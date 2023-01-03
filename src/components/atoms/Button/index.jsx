import React from "react";

const Button = (props) => {
  const className = `border-black border-4 px-3 py-1 bg-orange-400 disabled:bg-primary-400 rounded disabled:animate-none ${props.className}`;
  return (
    <button
      className={className}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
