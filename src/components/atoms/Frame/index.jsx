import React from "react";

const Frame = ({ children }) => {
  return (
    <div className="relation m-3 before:absolute before:top-1 before:left-1 before:w-[calc(100%-4px)] md:before:w-[calc(100%/2-5px)] lg:before:w-96 before:h-48 before:bg-yellow-600 animate-scale animate-wiggle font-display text-primary-300 z-10 rounded-lg">
      <div className="absolute inset-0 bg-cyan-700 w-[calc(100%-4px)] md:w-[calc(100%/2-5px)] lg:w-96 h-48 p-3">
        {children}
      </div>
    </div>
  );
};

export default Frame;
