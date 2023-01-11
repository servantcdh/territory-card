import React from "react";

const TerritoryAssignCardBox = ({ className, childClassName, children }) => {
  return (
    <div className={`p-2 w-full h-[72.5vh] bg-amber-100 rounded text-primary-900 ${className}`}>
      <div className={`p-1 w-full h-full border border-dashed border-primary-400 ${childClassName}`}>{children}</div>
    </div>
  );
};

export default TerritoryAssignCardBox;
