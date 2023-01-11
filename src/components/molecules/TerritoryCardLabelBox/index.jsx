import React from "react";

const TerritoryCardLabelBox = ({
  className,
  children,
  dragAreaRef,
  fileInputId
}) => {
  return (
    <div className={`overflow-y-scroll relative text-sm font-thin ${className}`}>
      <label className="block h-full" htmlFor={fileInputId} ref={dragAreaRef}>
        {children}
      </label>
    </div>
  );
};

export default TerritoryCardLabelBox;
