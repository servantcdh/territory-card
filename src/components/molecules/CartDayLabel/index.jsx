import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/images/cart.webp";
import Button from "../../atoms/Button";

const CartDayLabel = ({ item }) => {
  const navigate = useNavigate();
  const { dayCode, cartDayTime } = item;
  const onClickHandler = useCallback(() => {}, [navigate]);
  let bgClass = "";
  let dayName = "";
  switch (dayCode) {
    case 0:
      dayName = "일";
      bgClass = "bg-rose-600";
      break;
    case 1:
      dayName = "월";
      bgClass = "bg-teal-600";
      break;
    case 2:
      dayName = "화";
      bgClass = "bg-teal-600";
      break;
    case 3:
      dayName = "수";
      bgClass = "bg-teal-600";
      break;
    case 4:
      dayName = "목";
      bgClass = "bg-teal-600";
      break;
    case 5:
      dayName = "금";
      bgClass = "bg-teal-600";
      break;
    case 6:
      dayName = "토";
      bgClass = "bg-blue-600";
      break;
  }
  return (
    <div
      className={`w-[300px] h-[200px] mx-1.5 p-1 text-primary-100 font-display rounded animate-scale ${bgClass}`}
    >
      <div className="w-full h-full p-1 rounded flex">
        <div>
          <div className="text-4xl ml-1 mb-2">{dayName}.</div>
          <div>
            <img className="h-[130px]" src={img} alt="cart image" />
          </div>
        </div>
        <div>
          <div className="text-xs w-[215px] h-[145px] mx-2 mt-2 p-2 rounded bg-gray-900 opacity-75 overflow-y-scroll scrollbar-hide mr-2">
            {!!cartDayTime.length &&
              cartDayTime.map((time) => (
                <div key={time.idx} className="mb-2">
                  {time.startTime} ~ {time.endTime} 참여하기
                </div>
              ))}
            {!cartDayTime.length && (
              <div className="mb-2">일정이 없습니다.</div>
            )}
          </div>
          <div className="text-right">
            <Button className="border-0 bg-transparent">일정관리 &gt;</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDayLabel;
