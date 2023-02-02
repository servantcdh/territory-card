import React from "react";
import CartDayLabel from "../../molecules/CartDayLabel";

const CartWeekLabelBox = ({
  className,
  items,
  hasAuth,
}) => {
  return (
    <div
      className={`${className} mt-3 w-full p-2 h-[300px] overflow-x-scroll scrollbar-hide`}
    >
      <div className="w-[2184px]">
        {items.map((item) => (
          <div key={item.idx} className="inline-block">
            <CartDayLabel
              item={item}
              hasAuth={hasAuth}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartWeekLabelBox;
