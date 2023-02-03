import React, { useCallback, useEffect, useRef } from "react";
import Input from "../../atoms/Input";

const CartDayTimeEdit = ({
  timeString,
  isStart,
  anotherString,
  idx,
  onChange,
}) => {
  const selectRef = useRef();
  const hourRef = useRef();
  const minuteRef = useRef();
  const init = (string) => {
    const words = string.split(" ");
    const ampm = words[0];
    const clockWords = words[1].split(":");
    const hour = clockWords[0];
    const min = clockWords[1];
    selectRef.current.value = ampm;
    hourRef.current.value = hour;
    minuteRef.current.value = min;
  };
  const onSelectChangeHandler = useCallback(() => {
    onCompleteHandler();
  }, [onCompleteHandler, timeString, anotherString]);
  const onHourKeyDownHandler = useCallback((e) => {
    const keyInput = e.key;
    const value = e.target.value;
    const word = `${value}${keyInput}`;
    const preventPlusMinus = keyInput === "+" || keyInput === "-";
    const preventExceed = +word > 12;
    if (preventPlusMinus || preventExceed) {
      e.preventDefault();
    }
  }, []);
  const onMinuteKeyDownHandler = useCallback((e) => {
    const keyInput = e.key;
    const value = e.target.value;
    const word = `${value}${keyInput}`;
    const preventPlusMinus = keyInput === "+" || keyInput === "-";
    const preventExceed = +word > 59;
    if (preventPlusMinus || preventExceed) {
      e.preventDefault();
    }
  }, []);
  const onHourBlurHandler = useCallback(
    (e) => {
      const value = e.target.value;
      if (!value || !+value) {
        e.target.value = "12";
      }
      if (value[0] === "0") {
        e.target.value = value[1];
      }
      onCompleteHandler();
    },
    [onCompleteHandler, timeString, anotherString]
  );
  const onMinuteBlurHandler = useCallback(
    (e) => {
      const value = e.target.value;
      if (!value || !+value) {
        e.target.value = "00";
      }
      onCompleteHandler();
    },
    [onCompleteHandler, timeString, anotherString]
  );
  const onCompleteHandler = useCallback(() => {
    const ampm = selectRef.current.value;
    const hour = +hourRef.current.value;
    const minute = minuteRef.current.value;
    const isoHour = ampm === "오후" && hour < 12 ? 12 + hour : hour;
    const time = new Date(
      `2023-02-02 ${isoHour < 10 ? `0${isoHour}` : isoHour}:${minute}`
    ).getTime();
    const words = anotherString.split(" ");
    const ampmAnother = words[0];
    const clockWords = words[1].split(":");
    const hourAnother = +clockWords[0];
    const minuteAnother = clockWords[1];
    const isoHourAnother =
      ampmAnother === "오후" && hourAnother < 12
        ? 12 + hourAnother
        : hourAnother;
    const timeAnother = new Date(
      `2023-02-02 ${
        isoHourAnother < 10 ? `0${isoHourAnother}` : isoHourAnother
      }:${minuteAnother}`
    ).getTime();
    if ((isStart && time < timeAnother) || (!isStart && time > timeAnother)) {
      const updateTime = `${ampm} ${hour}:${minute}`;
      const data = { cartDayTimeIdx: idx };
      if (isStart) {
        data.startTime = updateTime;
      } else {
        data.endTime = updateTime;
      }
      if (timeString !== updateTime) {
        onChange(data);
      }
    } else {
      init(timeString);
    }
  }, [selectRef, hourRef, minuteRef, timeString, anotherString, isStart]);
  useEffect(() => {
    init(timeString);
  }, [timeString]);
  return (
    <div className="flex -mt-[1px] rounded text-base">
      <select
        ref={selectRef}
        className="h-[23px] leading-[21px] mr-1 appearance-none bg-transparent"
        onChange={onSelectChangeHandler}
      >
        <option>오전</option>
        <option>오후</option>
      </select>
      <Input
        htmlRef={hourRef}
        type="number"
        inputMode="numeric"
        className="appearance-none leading-normal text-right w-[23px] h-[23px] tracking-tighter border-none px-0 pr-0.5 m-0 bg-transparent"
        onKeyDown={onHourKeyDownHandler}
        onBlur={onHourBlurHandler}
      />
      <p className="leading-[21px]">:</p>
      <Input
        htmlRef={minuteRef}
        type="number"
        inputMode="numeric"
        className="appearance-none leading-normal text-right w-[23px] h-[23px] tracking-tighter border-none px-0 pr-0.5 m-0 bg-transparent"
        onKeyDown={onMinuteKeyDownHandler}
        onBlur={onMinuteBlurHandler}
      />
    </div>
  );
};

export default CartDayTimeEdit;
