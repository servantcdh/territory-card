import React from "react";

const Input = ({
  className,
  type,
  htmlRef,
  id,
  name,
  inputMode,
  value,
  checked,
  pattern,
  placeholder,
  disabled,
  required,
  onKeyUp,
  onKeyDown,
  onBlur,
  onChange,
  error,
  multiple,
  accept,
  max,
  min,
}) => {
  return (
    <input
      className={`w-100 h-10 border-black border-4 py-1 px-2 rounded font-body focus:ring-cyan-500 focus:border-cyan-500 ${className} ${
        error ? "animate-error border-red-600" : ""
      }`}
      type={type}
      ref={htmlRef}
      id={id}
      name={name}
      inputMode={inputMode}
      defaultValue={value}
      defaultChecked={checked}
      pattern={pattern}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      onKeyUp={onKeyUp}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      multiple={multiple}
      accept={accept}
      max={max}
      min={min}
    />
  );
};

export default Input;
