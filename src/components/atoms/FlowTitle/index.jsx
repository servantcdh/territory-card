import React from "react";

const FlowTitle = ({ className, children }) => {
  return (
    <div className={`overflow-x-hidden overflow-y-hidden ${className}`}>
      <div className="relative">
        <div className="relative whitespace-nowrap will-change-transform animate-title">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FlowTitle;
