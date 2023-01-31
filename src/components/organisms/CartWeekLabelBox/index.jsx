import React from "react";
import CartDayLabel from "../../molecules/CartDayLabel";

const CartWeekLabelBox = ({ className, items }) => {
  return (
    <div
      className={` ${className} w-full p-2 h-[210px] overflow-x-scroll scrollbar-hide`}
    >
      <div className="w-[2184px]">
        {items.map((item) => (
          <div key={item.idx} className="inline-block">
            <CartDayLabel item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartWeekLabelBox;
