import React, { useCallback } from "react";
import Button from "../../atoms/Button";
import KakaoMapButton from "../../atoms/KakaoMapButton";
import Textarea from "../../atoms/Textarea";
import ProfileStack from "../ProfileStack";

const TerritoryInfo = ({
  cardData,
  cardAssignedIdx,
  users,
  isUserAssignedTo,
  dateAssigned,
  address,
  onMemoChange,
  onCompleteClick,
}) => {
  const onMemoChangeHander = useCallback(
    (memo) => {
      onMemoChange(memo);
    },
    [onMemoChange]
  );
  return (
    <div className="w-auto h-auto">
      <div className="border border-primary-300 w-full h-full p-2 flex z-10 break-all mb-1">
        <div className="w-24">
          <div>구역번호.{cardData.idx}</div>
          <div className="mb-1 text-xl">{cardData.name}</div>
          <div>배정날짜.</div>
          <div className="text-sm">
            {new Date(dateAssigned).toLocaleDateString()}
          </div>
        </div>
        <div className="border-r border-primary-300 mx-3"></div>
        <div className="">
          <div>함께하는 사람.</div>
          <div className="mb-2">
            <ProfileStack key={`stack_${cardAssignedIdx}`} users={users} />
          </div>
          {isUserAssignedTo && (
            <div>
              <KakaoMapButton
                className="text-sm border-2 cursor-pointer mr-1 bg-yellow-400 text-black hover:bg-yellow-600"
                dest={cardData.name}
                address={address}
              >
                카카오내비
              </KakaoMapButton>
              <Button
                className="text-sm border-2 cursor-pointer text-black hover:bg-yellow-600"
                onClick={onCompleteClick}
              >
                반납하기
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="border border-primary-300 w-full h-full p-2 break-all">
        <div className="">
          <div className="mb-1">메모.</div>
          <div>
            {isUserAssignedTo && (
              <Textarea
                className="w-full py-3 text-primary-700"
                value={cardData.memo}
                onChange={onMemoChangeHander}
              />
            )}
            {!isUserAssignedTo && (
              <div className="bg-amber-100 w-full p-3 text-primary-700 rounded">
                {cardData.memo}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerritoryInfo;
