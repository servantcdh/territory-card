import React from "react";
import Frame from "../../atoms/Frame";

const TerritoryCard = ({ className, childClassName, titleClassName, children, title }) => {
  return (
    <Frame
      className={`before:w-[calc(100%-1rem)] before:h-[calc(100%-3rem)] before:left-3 md:before:left-[calc(100%/2-5px)] lg:before:left-[calc(100%/2-188px)] before:top-6 ${className}`}
      childClassName={`mx-auto w-[calc(100%-1rem)] h-[calc(100%-3rem)] p-2 my-5 ${childClassName}`}
    >
      {title && <div className={`ml-2 text-2xl ${titleClassName ? titleClassName : "text-primary-200"} mb-1`}>{title}</div>}
      {children}
    </Frame>
  );
};

export default TerritoryCard;
