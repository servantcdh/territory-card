import React, { useCallback, useEffect, useState } from "react";

const Textarea = ({ className, id, value, placeholder, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const onChangeHandler = useCallback(
    (e) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(inputValue);
      clearTimeout(timeout);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);
  return (
    <textarea
      className={`resize-none whitespace-pre-wrap bg-amber-100 p-2 rounded ${className}`}
      id={id}
      value={inputValue}
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  );
};

export default Textarea;
