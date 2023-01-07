import React from "react";
import Frame from "../../atoms/Frame";

const TerritoryCard = ({ children }) => {
  return (
    <Frame
      className="before:w-[calc(100%-1rem)] before:h-[calc(100%-3rem)] before:left-3 md:before:left-[calc(100%/2-5px)] lg:before:left-[calc(100%/2-188px)] before:top-6"
      childClassName="mx-auto w-[calc(100%-1rem)] h-[calc(100%-3rem)] p-2 my-5"
    >
      {children}
    </Frame>
  );
};

export default TerritoryCard;
