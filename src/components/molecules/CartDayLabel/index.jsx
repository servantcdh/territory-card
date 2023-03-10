import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/images/cart.webp";
import Button from "../../atoms/Button";
import Svg from "../../atoms/Svg";

const CartDayLabel = ({ item, hasAuth }) => {
  const navigate = useNavigate();
  const { dayCode, cartDayTime } = item;
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
  const todayCode = new Date().getDay();
  const isToday = dayCode === todayCode;
  if (isToday) {
    dayName = "오늘";
  }
  const onAuthClickHandler = useCallback(() => {
    navigate(`/cartDay/${dayCode}`);
  }, [navigate]);
  const onEntryClickHandler = useCallback(
    ({ idx }) => {
      navigate(`/cart/${idx}`);
    },
    [navigate]
  );
  return (
    <div
      className={`w-[300px] h-[200px] mx-1.5 p-1 text-primary-100 font-display rounded animate-scale ${bgClass}`}
    >
      <div className="w-full h-full p-1 rounded flex">
        <div>
          <div className="relative text-4xl ml-1 mb-2 z-[1]">{dayName}.</div>
          <div
            className={`z-0 relative opacity-60 ${isToday ? "-top-10" : ""}`}
          >
            <img className="h-[130px]" src={img} alt="cart image" />
          </div>
        </div>
        <div>
          <div
            className={`text-sm w-[215px] ${
              hasAuth ? "h-[145px]" : "h-[168px]"
            } mx-2 mt-2 p-2 rounded bg-gray-900 opacity-75 overflow-y-scroll scrollbar-hide mr-2`}
          >
            {!!cartDayTime.length &&
              cartDayTime.map((time) => (
                <div key={time.idx} className="mb-2 p-1 pl-2 rounded bg-black">
                  <p>
                    {time.startTime} ~ {time.endTime}
                  </p>
                  <div className="text-right">
                    <Button
                      className="border-0 bg-transparent pr-1 mt-0.5"
                      onClick={onEntryClickHandler.bind(null, time)}
                    >
                      참여하기{" "}
                      <Svg
                        className="inline w-4 h-4 mb-[3px] -ml-2 animate-shakeRight"
                        type="chevronRight"
                      />
                    </Button>
                  </div>
                </div>
              ))}
            {!cartDayTime.length && (
              <div className="mb-2">일정이 없습니다.</div>
            )}
          </div>
          {hasAuth && (
            <div className="text-right">
              <Button
                className="border-0 bg-transparent pr-1 mt-0.5"
                onClick={onAuthClickHandler}
              >
                일정관리{" "}
                <Svg
                  className="inline w-4 h-4 mb-[3px] -ml-2 animate-shakeRight"
                  type="chevronRight"
                />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDayLabel;
