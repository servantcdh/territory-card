import React from "react";

const Body = ({ className, children }) => {
  return <div className={`w-screen h-screen ${className}`}>{children}</div>;
};

export default Body;
