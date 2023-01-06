import React, { useCallback } from "react";
import Frame from "../../atoms/Frame";
import ProfileStack from "../ProfileStack";
import { useNavigate } from "react-router-dom";

const CardLabel = ({ item }) => {
  const navigate = useNavigate();
  const users = [];
  item.crewAssigned.forEach((crew) => users.push(crew.user));
  const onClickHandler = useCallback(() => {
    navigate(`/view/${item.cardIdx}`);
  }, [navigate]);
  return (
    <Frame>
      <div className="border border-primary-300 w-full h-full p-2 flex z-10 break-all">
        <div className="w-24">
          <div>카드번호.{item.cardIdx}</div>
          <div className="mb-1 text-xl">{item.card.name}</div>
          <div>배정날짜.</div>
          <div className="text-sm">
            {new Date(item.dateAssigned).toLocaleDateString()}
          </div>
        </div>
        <div className="border-r border-primary-300 mx-3"></div>
        <div className="">
          <div>함께하는 사람.</div>
          <ProfileStack key={`stack_${item.idx}`} users={users} />
          <div
            className="absolute right-6 bottom-5 text-2xl cursor-pointer text-yellow-200 hover:text-yellow-500"
            onClick={onClickHandler}
          >
            시작하기
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default CardLabel;
