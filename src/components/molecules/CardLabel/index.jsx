import React, { useCallback } from "react";
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
    <div className="relation m-3 before:absolute before:top-1 before:left-1 before:w-[calc(100%-4px)] md:before:w-[calc(100%/2-5px)] lg:before:w-96 before:h-48 before:bg-yellow-600 animate-scale animate-wiggle font-display text-primary-300 z-10 rounded-lg">
      <div className="absolute inset-0 bg-cyan-700 w-[calc(100%-4px)] md:w-[calc(100%/2-5px)] lg:w-96 h-48 p-3">
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
      </div>
    </div>
  );
};

export default CardLabel;
