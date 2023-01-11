import React from "react";

const Input = ({
  className,
  type,
  id,
  name,
  inputMode,
  value,
  pattern,
  placeholder,
  disabled,
  required,
  onKeyUp,
  onChange,
  error,
  multiple,
  accept
}) => {
  return (
    <input
      className={`w-100 h-10 border-black border-4 py-1 px-2 rounded font-body focus:ring-cyan-500 focus:border-cyan-500 ${className} ${
        error ? "animate-error" : ""
      }`}
      type={type}
      id={id}
      name={name}
      inputMode={inputMode}
      value={value}
      pattern={pattern}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      onKeyUp={onKeyUp}
      onChange={onChange}
      multiple={multiple}
      accept={accept}
    />
  );
};

export default Input;
