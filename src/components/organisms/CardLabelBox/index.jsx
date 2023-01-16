import React from "react";
import CardLabel from "../../molecules/CardLabel";

const CardLabelBox = ({ className, items }) => {
  return (
    <div className={`flex flex-wrap flex-col md:flex-row lg:flex-row ${className}`}>
      {items.map((item) => (
        <div key={item.idx} className="relative md:w-[calc(50%)] lg:w-[420px] h-[215px]">
          <CardLabel item={item} />
        </div>
      ))}
    </div>
  );
};

export default CardLabelBox;
