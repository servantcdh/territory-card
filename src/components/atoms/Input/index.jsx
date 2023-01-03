import React from "react";

const Input = (props) => {
  const className = ` ${props.className}`;
  return (
    <input
      className={className}
      type={props.type}
      inputMode={props.inputMode}
      value={props.value}
      disabled={props.disabled}
      placeholder={props.placeholder}
      pattern={props.pattern}
      required={props.required}
    />
  );
};

export default Input;
