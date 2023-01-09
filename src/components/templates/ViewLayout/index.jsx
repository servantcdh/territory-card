import React, { useCallback, useState } from "react";
import Body from "../../atoms/Body";
import Modal from "../../molecules/Modal";
import TerritoryCard from "../../molecules/TerritoryCard";
import TerritoryInfo from "../../molecules/TerritoryInfo";
import TerritoryContentBox from "../../organisms/TerritoryContentBox";

const ViewLayout = ({
  cardData,
  assignedData,
  users,
  userIdx,
  address,
  onMemoChange,
  onMemoFocus,
  onCompleteCard,
  onMark,
}) => {
  const [activeModal, setActiveModal] = useState(false);
  const onCompleteClickHandler = useCallback(() => {
    setActiveModal(true);
  }, [setActiveModal]);
  const onModalConfirmHandler = useCallback(() => {
    onCompleteCard();
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
  const assignedDataLog = cardData ? cardData.cardAssigned : [];
  const lastDateCompleted = assignedDataLog.length ? assignedDataLog[assignedDataLog.length - 1].dateCompleted : "";
  const {
    userIdx: userIdxAssignedTo,
    dateAssigned,
    cardRecord,
  } = assignedData
    ? assignedData
    : {
        userIdx: 0,
        dateAssigned: "",
        cardRecord: null,
      };
  const isUserAssignedTo = userIdx === userIdxAssignedTo;
  const disabledMemo =
    cardData &&
    !!cardData.memoFocusUserIdx &&
    cardData.memoFocusUserIdx !== userIdx;
  const memoFocusUser = !disabledMemo
    ? null
    : users.find((user) => user.idx === cardData.memoFocusUserIdx);
  const cardContent = cardData ? cardData.cardContent : null;
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
          lastDateCompleted={lastDateCompleted}
          address={address}
          onMemoChange={onMemoChangeHandler}
          onMemoFocus={onMemoFocusHandler}
          disabledMemo={disabledMemo}
          memoFocusUser={memoFocusUser}
          onCompleteClick={onCompleteClickHandler}
        />
        <TerritoryContentBox
          cardContent={cardContent}
          cardRecord={cardRecord}
          onMark={onMarkHandler}
          userIdx={userIdx}
        />
      </TerritoryCard>
    </Body>
  );
};

export default ViewLayout;
