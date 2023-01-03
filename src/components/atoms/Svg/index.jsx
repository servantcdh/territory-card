import React from "react";

/**
 * https://heroicons.dev/
 */

const getSvgPath = (type) => {
  if (type === "smile") {
    return "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
  }
  if (type === "hand") {
    return "M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11";
  }
  if (type === "plus") {
    return "M12 6v6m0 0v6m0-6h6m-6 0H6";
  }
  if (type === "logout") {
    return "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1";
  }
  if (type === "user-circle") {
    return "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  }
  if (type === "cog") {
    return "M15 12a3 3 0 11-6 0 3 3 0 016 0z";
  }
  if (type === "table") {
    return "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
  }
};

const Svg = (props) => {
  const { type } = props;
  const className = props.className ? props.className : `w-6 h-6`;
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={getSvgPath(type)}
      ></path>
    </svg>
  );
};

export default Svg;
