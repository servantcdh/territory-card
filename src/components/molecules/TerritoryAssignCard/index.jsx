import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import Profile from "../../atoms/Profile";
import ProfileCardList from "../../organisms/ProfileCardList";
import Modal from "../Modal";
import ProfileStack from "../ProfileStack";

const TerritoryAssignCard = ({
  className,
  users,
  assignedCard,
  onAssignCrew,
  onSearch,
  onRetrieve,
}) => {
  const [activeUsersModal, setActiveUsersModal] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const navigate = useNavigate();
  const { idx, card, crewAssigned, userIdx, dateAssigned } = assignedCard
    ? assignedCard
    : {
        idx: 0,
        card: null,
        crewAssigned: [],
        userIdx: 0,
        dateAssigned: "",
      };
  const userIdxes = crewAssigned.map(({ userIdx }) => userIdx);
  const crews = crewAssigned.map(({ user }) => user);
  const { idx: cardIdx, name } = card ? card : { idx: 0, name: "" };
  // TODO 자동차 소유 여부, 봉사 진행 여부
  // const hasCar = crewAssigned.find(
  //   ({ user }) => user.access && user.access.car
  // );
  // console.log(!!hasCar);
  const onViewClickHandler = useCallback(() => {
    navigate(`/view/${cardIdx}/${idx}`);
  }, [navigate]);
  const onActiveUsersModalHandler = useCallback(() => {
    setActiveUsersModal(true);
  }, [setActiveUsersModal]);
  const onDectiveUsersModalHandler = useCallback(() => {
    setActiveUsersModal(false);
  }, [setActiveUsersModal]);
  const onAssignCrewChangeHandler = useCallback(
    (crewInfo) => {
      onAssignCrew(idx, crewInfo);
      setActiveUsersModal(false);
    },
    [idx, onAssignCrew, setActiveUsersModal]
  );
  const onActiveRetrieveModalHandler = useCallback(() => {
    setActiveModal(true);
  }, [setActiveModal]);
  const onCancelRetrieveModalHandler = useCallback(() => {
    setActiveModal(false);
  }, [setActiveModal]);
  const onConfirmRetrieveModalHandler = useCallback(() => {
    setActiveModal(false);
    onRetrieve(idx);
  }, [setActiveModal, onRetrieve, idx]);
  return (
    <>
      {activeUsersModal && (
        <ProfileCardList
          users={users ? users : []}
          userIdxes={userIdxes}
          userIdx={userIdx}
          onAssign={onAssignCrewChangeHandler}
          onSearch={onSearch}
          onCancel={onDectiveUsersModalHandler}
        />
      )}
      {activeModal && (
        <Modal
          className="bg-amber-200"
          title={`다음의 카드를 회수하시겠습니까?`}
          onConfirm={onConfirmRetrieveModalHandler}
          onCancel={onCancelRetrieveModalHandler}
          buttonName="회수하기"
          cancelName="취소"
        >
          <div
            className={`m-auto text-[10px] p-1 w-[250px] h-[70px] mb-1 bg-yellow-400 rounded-sm border border-primary-400 ${className}`}
          >
            <div className="w-[100%]">
              <div className="text-[13px]">
                구역번호.{cardIdx} {name}
              </div>
              <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                <div>배정 날짜.{dateAssigned.split("T")[0]}</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div
        className={`flex text-[10px] p-1 w-full h-[97px] mb-1 bg-yellow-400 rounded-sm border border-primary-400 ${className}`}
      >
        <div className="w-[36rem]">
          <div className="text-[13px]">
            구역번호.{cardIdx} {name}
          </div>
          <div className="flex whitespace-nowrap overflow-hidden text-ellipsis">
            <div>
              <div>배정 날짜.{dateAssigned.split("T")[0]}</div>
            </div>
          </div>
          <div className="border-b border-black mx-1 my-1"></div>
          <div className="flex">
            {crewAssigned.length <= 5 &&
              crewAssigned.map(({ user }) => (
                <Profile
                  key={`profile_${user.idx}`}
                  className="w-[36px] h-[36px] mr-[1.5px]"
                  liveClassName="left-[1.55rem]"
                  assigned={user.idx === userIdx}
                  {...user}
                  {...user.access}
                />
              ))}
            {crewAssigned.length > 5 && (
              <ProfileStack className="w-[38.5px] h-[38.5px]" users={crews} userIdx={userIdx} />
            )}
          </div>
        </div>
        <div className="border-r border-dashed border-black mx-1 my-1"></div>
        <div className="mt-1 text-[13px]">
          <Button
            className="w-[60px] h-[25px] border-2 px-0 py-0 mb-0.5 bg-violet-400"
            onClick={onViewClickHandler}
          >
            상세보기
          </Button>
          <Button
            className="w-[60px] h-[25px] border-2 px-0 py-0 mb-0.5 bg-sky-500"
            onClick={onActiveUsersModalHandler}
          >
            전도인배정
          </Button>
          <Button
            className="w-[60px] h-[25px] border-2 px-0 py-0 mb-0.5 bg-rose-400"
            onClick={onActiveRetrieveModalHandler}
          >
            회수
          </Button>
        </div>
      </div>
    </>
  );
};

export default TerritoryAssignCard;
