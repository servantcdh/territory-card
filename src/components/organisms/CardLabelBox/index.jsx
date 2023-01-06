import React from "react";
import CardLabel from "../../molecules/CardLabel";

const CardLabelBox = ({ className, items }) => {
  return (
    <div className={` ${className}`}>
      {items.map((item) => (
        <CardLabel key={item.idx} item={item} />
      ))}
    </div>
  );
};

export default CardLabelBox;
