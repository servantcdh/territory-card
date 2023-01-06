import React from "react";
import Frame from "../../atoms/Frame";

const TerritoryCard = ({ children }) => {
  return (
    <Frame
      className="before:w-[calc(100%-1rem)] before:h-96 before:left-3 before:top-6"
      childClassName="mx-auto w-[calc(100%-1rem)] h-96 p-2 my-5"
    >
      {children}
    </Frame>
  );
};

export default TerritoryCard;
