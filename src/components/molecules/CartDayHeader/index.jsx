import React from "react";

const CartDayHeader = ({ dayCode, children }) => {
  const dayName = new Array("일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일")[dayCode];
  return (
    <div className="flex">
      <div className="text-4xl w-48">{dayName}.</div>
      <div className="w-full mx-auto text-right">{children}</div>
    </div>
  );
};

export default CartDayHeader;
