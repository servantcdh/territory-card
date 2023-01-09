import React from "react";

const TerritoryCardStoreBox = ({ className, children }) => {
  return (
    <div className={`p-2 w-full h-[75vh] bg-amber-100 rounded text-primary-900 ${className}`}>
      <div className="flex p-1 w-full h-full border border-dashed border-primary-400">{children}</div>
    </div>
  );
};

export default TerritoryCardStoreBox;
