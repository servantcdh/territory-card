import React, { useCallback, useState } from "react";
import Body from "../../atoms/Body";
import Modal from "../../molecules/Modal";
import TerritoryCard from "../../molecules/TerritoryCard";
import TerritoryInfo from "../../molecules/TerritoryInfo";
import TerritoryContentBox from "../../organisms/TerritoryContentBox";

const ViewLayout = ({
  cardStatus,
  cardData,
  assignedStatus,
  assignedData,
  users,
  userIdx,
  address,
  onMemoChange,
  onMemoFocus,
  onMark,
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
  const onMemoChangeHandler = useCallback(
    (memo) => {
      onMemoChange(memo);
    },
    [onMemoChange]
  );
  const onMemoFocusHandler = useCallback(
    (focused) => {
      onMemoFocus(focused);
    },
    [onMemoFocus]
  );
  const onMarkHandler = useCallback(
    (cardContentIdx, cardMarkIdx) => {
      onMark(cardContentIdx, cardMarkIdx);
    },
    [onMark]
  );
  if (cardStatus !== "success" || assignedStatus !== "success") {
    if (cardStatus === "error" || assignedStatus !== "error") {
      return;
    }
    return;
  }
  const { userIdx: userIdxAssignedTo, dateAssigned, cardRecord } = assignedData;
  const isUserAssignedTo = userIdx === userIdxAssignedTo;
  const disabledMemo = !!cardData.memoFocusUserIdx && cardData.memoFocusUserIdx !== userIdx;
  const memoFocusUser = !disabledMemo ? null : users.find((user) => user.idx === cardData.memoFocusUserIdx);
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
          className="mb-3"
          cardData={cardData}
          users={users}
          isUserAssignedTo={isUserAssignedTo}
          dateAssigned={dateAssigned}
          address={address}
          onMemoChange={onMemoChangeHandler}
          onMemoFocus={onMemoFocusHandler}
          disabledMemo={disabledMemo}
          memoFocusUser={memoFocusUser}
          onCompleteClick={onCompleteClickHandler}
        />
        <TerritoryContentBox
          cardContent={cardData.cardContent}
          cardRecord={cardRecord}
          onMark={onMarkHandler}
          userIdx={userIdx}
        />
      </TerritoryCard>
    </Body>
  );
};

export default ViewLayout;
