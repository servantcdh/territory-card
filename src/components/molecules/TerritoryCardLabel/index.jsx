import React, { useCallback, useState } from "react";

const TerritoryCardLabel = ({ className, card, onClick }) => {
  const [checked, setChecked] = useState(false);
  const cardAssigned = card ? card.cardAssigned : [];
  const lastRecord = cardAssigned[cardAssigned.length - 1];
  const lastDateCompleted =
    lastRecord && lastRecord.dateCompleted
      ? lastRecord.dateCompleted.split("T")[0]
      : "";
  const onClickHandler = useCallback(() => {
    setChecked((prev) => !prev);
    onClick(card, checked);
  }, [onClick, checked, setChecked]);
  return (
    <div
      className={`flex p-2 w-full h-[60px] mb-1 border-2 border-black ${checked ? "bg-yellow-400" : "bg-primary-300"} rounded-sm ${className}`}
      onClick={onClickHandler}
    >
      <div className="w-[85px] whitespace-nowrap overflow-hidden text-ellipsis">
        <div>구역번호.{card.idx}</div>
        <div>{card.name}</div>
      </div>
      <div className="flex-none border-r border-black mx-2"></div>
      <div className="flex-initial">
        <div>마지막 봉사날짜</div>
        <div>{lastDateCompleted}</div>
      </div>
    </div>
  );
};

export default TerritoryCardLabel;
