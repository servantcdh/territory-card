import React from "react";

const Tag = ({ className, children }) => {
  return (
    <span
      className={`rounded border-black border-2 px-1 bg-rose-400 font-thin text-sm ${className}`}
    >
      {children}
    </span>
  );
};

export default Tag;
