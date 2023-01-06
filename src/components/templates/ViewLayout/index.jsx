import React, { useCallback, useState } from "react";
import Body from "../../atoms/Body";
import Modal from "../../molecules/Modal";
import TerritoryInfo from "../../molecules/TerritoryInfo";
import TerritoryCard from "../../organisms/TerritoryCard";

const ViewLayout = ({
  cardStatus,
  cardData,
  assignedStatus,
  assignedData,
  users,
  userIdx,
  address,
  onMemoChange,
}) => {
  const [activeModal, setActiveModal] = useState(false);
  const onCompleteClickHandler = useCallback(() => {
    setActiveModal(true);
  }, [setActiveModal]);
  const onModalConfirmHandler = useCallback(() => {
    setActiveModal(false);
  }, [setActiveModal]);
  const onModalCancelHandler = useCallback(() => {
    setActiveModal(false);
  }, [setActiveModal]);
  const onMemoChangeHander = useCallback(
    (memo) => {
      onMemoChange(memo);
    },
    [onMemoChange]
  );
  if (cardStatus !== "success" || assignedStatus !== "success") {
    if (cardStatus === "error" || assignedStatus !== "error") {
      return <p>정보를 불러올 수 없습니다.</p>;
    }
    return <p>불러오는 중...</p>;
  }
  const {
    idx: cardAssignedIdx,
    userIdx: userIdxAssignedTo,
    dateAssigned,
  } = assignedData;
  const isUserAssignedTo = userIdx === userIdxAssignedTo;
  return (
    <Body className="animate-naviToView p-1">
      {activeModal && (
        <Modal
          title="수고하셨습니다!"
          onConfirm={onModalConfirmHandler}
          onCancel={onModalCancelHandler}
          buttonName="예"
          cancelName="아니오"
        >
          <div>
            <p>이제 카드를 반납하시겠어요?</p>
          </div>
        </Modal>
      )}
      <TerritoryCard>
        <TerritoryInfo
          cardData={cardData}
          cardAssignedIdx={cardAssignedIdx}
          users={users}
          isUserAssignedTo={isUserAssignedTo}
          dateAssigned={dateAssigned}
          address={address}
          onMemoChange={onMemoChangeHander}
          onCompleteClick={onCompleteClickHandler}
        />
        {/* TerritoryContent */}
        {/* TerritoryContentRefusal */}
        {/* TerritoryContentPhone */}
        {/* TerritoryContentCallModal */}
        <div>
          {/* TerritoryContentStreet */}
          {/* TerritoryContentBuilding */}
          {/* TerritoryContentName */}
          {/* MarkBox */}
        </div>
      </TerritoryCard>
    </Body>
  );
};

export default ViewLayout;
