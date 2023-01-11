import React from "react";

const Card = ({ className, children, onClick }) => {
  return (
    <div
      className={`p-5 font-display ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
