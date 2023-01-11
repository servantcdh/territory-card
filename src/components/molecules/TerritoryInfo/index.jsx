import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import KakaoMapButton from "../../atoms/KakaoMapButton";
import Profile from "../../atoms/Profile";
import Textarea from "../../atoms/Textarea";

const TerritoryInfo = ({
  className,
  cardData,
  users,
  isUserAssignedTo,
  dateAssigned,
  lastDateCompleted,
  address,
  onMemoChange,
  onMemoFocus,
  disabledMemo,
  memoFocusUser,
  onCompleteClick,
}) => {
  const navigate = useNavigate();
  const { idx, name, memo } = cardData
    ? cardData
    : { idx: 0, name: "", memo: "" };
  const onMemoChangeHandler = useCallback(
    (memo) => {
      onMemoChange(memo);
    },
    [onMemoChange]
  );
  const onFocusHandler = useCallback(() => {
    onMemoFocus(true);
  }, [onMemoFocus]);
  const onBlurHandler = useCallback(() => {
    onMemoFocus(false);
  }, [onMemoFocus]);
  const onProfileClickHandler = useCallback((userIdx) => {
    navigate(`/profile/${userIdx}`);
  }, []);
  return (
    <div className={`w-auto h-auto ${className}`}>
      <div className="border border-primary-300 w-full h-full p-2 flex z-10 break-all mb-1">
        <div className="w-[106px]">
          <div>구역번호.{idx}</div>
          <div className="mb-1 text-xl">{name}</div>
          {dateAssigned && (
            <>
              <div>배정날짜.</div>
              <div className="text-sm">
                {dateAssigned.split('T')[0]}
              </div>
            </>
          )}
          {!dateAssigned && (
            <>
              <div>마지막 반납날짜.</div>
              <div className="text-sm">
                {lastDateCompleted ? lastDateCompleted.split('T')[0] : "-"}
              </div>
            </>
          )}
        </div>
        <div className="border-r border-primary-300 mx-3"></div>
        <div className="">
          <div>함께하는 사람.</div>
          <div className="mb-2 flex">
            {!!users.length &&
              users.map((user) => (
                <Profile
                  className="mr-[2px] w-[40px] h-[40px]"
                  liveClassName="left-[1.8rem]"
                  key={`profile_${user.idx}`}
                  {...user}
                  onClick={onProfileClickHandler.bind(null, user.idx)}
                  assigned={isUserAssignedTo}
                />
              ))}
          </div>
          <div>
            {address && (
              <KakaoMapButton
                className="text-sm border-2 cursor-pointer mr-1 bg-yellow-400 text-black hover:bg-yellow-600"
                dest={name}
                address={address}
              >
                카카오내비
              </KakaoMapButton>
            )}

            {isUserAssignedTo && (
              <Button
                className="text-sm border-2 cursor-pointer text-black hover:bg-yellow-600"
                onClick={onCompleteClick}
              >
                반납하기
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="border border-primary-300 w-full h-full p-2 break-all">
        <div className="">
          <div className="mb-1 flex">
            <div className="mb-1">메모.</div>
            {memoFocusUser ? (
              <p>(다음 사람이 작성중: {memoFocusUser.name})</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <Textarea
              className="w-full py-3 text-primary-700"
              value={memo}
              onChange={onMemoChangeHandler}
              onFocus={onFocusHandler}
              onBlur={onBlurHandler}
              disabled={disabledMemo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerritoryInfo;
