import React, { useCallback, useEffect, useRef, useState } from "react";

const Textarea = ({
  className,
  id,
  value,
  placeholder,
  onFocus,
  onBlur,
  disabled,
}) => {
  const ref = useRef();
  const onBlurHandler = useCallback(
    (e) => {
      onBlur(e.target.value);
    },
    [onBlur]
  );
  useEffect(() => {
    ref.current.value = value;
  }, [ref, value]);
  return (
    <textarea
      className={`resize-none whitespace-pre-wrap bg-amber-100 disabled:bg-gray-300 disabled:text-primary-500 p-2 rounded ${className}`}
      id={id}
      ref={ref}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlurHandler}
      disabled={disabled}
    />
  );
};

export default Textarea;
