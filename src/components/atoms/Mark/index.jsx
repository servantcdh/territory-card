import React, { useCallback } from "react";

/**
 * https://heroicons.dev/
 */

const getSvgPath = (markType) => {
  if (markType === 1) {
    return "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
  }
  if (markType === 2) {
    return "M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11";
  }
};

const getSvg = (markType) => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={getSvgPath(markType)}
      ></path>
    </svg>
  );
};

const Mark = ({ markType, checked, onCheck }) => {
  let className = "";
  if (markType === 1) {
    if (checked) {
      className = "bg-secondary-600";
    } else {
      className = "bg-secondary-900";
    }
  }
  if (markType === 2) {
    if (checked) {
      className = "bg-red-600";
    } else {
      className = "bg-red-900";
    }
  }
  const onClickHandler = useCallback(() => {
    onCheck(checked ? 0 : markType);
  }, [checked, markType]);
  return (
    <button
      className={`p-1 rounded ${className} text-primary-300`}
      onClick={onClickHandler}
    >
      {getSvg(markType)}
    </button>
  );
};

export default Mark;
