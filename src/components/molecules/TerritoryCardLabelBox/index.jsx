import React from "react";

const TerritoryCardLabelBox = ({ className, children }) => {
  return <div className={`overflow-y-scroll text-sm font-thin ${className}`}>{children}</div>;
};

export default TerritoryCardLabelBox;
