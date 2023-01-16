import React from "react";

const Frame = ({ className, childClassName, children }) => {
  return (
    <div className={`m-3 before:absolute before:top-1 before:left-1 before:w-[calc(100%-4px)] lg:before:w-96 before:h-48 before:bg-yellow-600 animate-fade font-display text-primary-300 z-1 rounded-lg ${className}`}>
      <div className={`absolute inset-0 bg-cyan-700 w-[calc(100%-4px)] lg:w-96 h-48 p-3 ${childClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Frame;
