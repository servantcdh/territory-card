import React, { useCallback, useEffect, useState } from "react";

const Textarea = ({
  className,
  id,
  value,
  placeholder,
  onFocus,
  onBlur,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const onChangeHandler = useCallback(
    (e) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );
  useEffect(() => {
    const timeout = setTimeout(() => {
      onBlur(inputValue);
      clearTimeout(timeout);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);
  return (
    <textarea
      className={`resize-none whitespace-pre-wrap bg-amber-100 disabled:bg-gray-300 disabled:text-primary-500 p-2 rounded ${className}`}
      id={id}
      value={inputValue}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onChangeHandler}
      disabled={disabled}
    />
  );
};

export default Textarea;
