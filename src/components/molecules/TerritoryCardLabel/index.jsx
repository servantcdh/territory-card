import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { excelCardApi } from "../../../hooks/api/file";
import Button from "../../atoms/Button";
import Modal from "../../molecules/Modal";

const TerritoryCardLabel = ({
  className,
  card,
  checkedCard,
  onCardClick,
  onRollbackCard,
}) => {
  const [checked, setChecked] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const navigate = useNavigate();
  const cardContent = card ? card.cardContent : [];
  const cardAssigned = card ? card.cardAssigned : [];
  const cardBackup = card ? card.cardBackup : [];
  const lastRecord = cardAssigned[cardAssigned.length - 1];
  const lastDateCompleted =
    lastRecord && lastRecord.dateCompleted
      ? lastRecord.dateCompleted.split("T")[0]
      : "-";
  const onCardClickHandler = useCallback(() => {
    setChecked((prev) => !prev);
    onCardClick(card.idx, checked);
  }, [card, onCardClick, checked, setChecked]);
  const onViewClickHandler = useCallback(() => {
    navigate(`/view/${card.idx}`);
  }, [navigate]);
  const onDownloadClickHandler = useCallback(() => {
    excelCardApi(card.idx, card.name);
  }, [card]);
  const onConfirmRollbackHandler = useCallback(() => {
    onRollbackCard(card.idx, cardBackup[0].idx);
    setActiveModal(false);
  }, [card, cardBackup, onRollbackCard, setActiveModal]);
  const onCancelRollbackHandler = useCallback(() => {
    setActiveModal(false);
  }, [setActiveModal]);
  const onRollbackCardHandler = useCallback(() => {
    setActiveModal(true);
  }, [setActiveModal]);
  useEffect(() => {
    setChecked(checkedCard);
  }, [setChecked, checkedCard]);
  return (
    <>
      {activeModal && (
        <Modal
          className="bg-amber-200"
          title="구역 카드 복구"
          onConfirm={onConfirmRollbackHandler}
          buttonName="복구하기"
          onCancel={onCancelRollbackHandler}
          cancelName="취소"
        ></Modal>
      )}

      <div
        className={`text-[10px] p-1 w-full h-[103px] mb-1 ${
          checked ? "bg-yellow-400" : "bg-primary-300"
        } rounded-sm ${className} border border-primary-400`}
      >
        <div
          className="whitespace-nowrap overflow-hidden text-ellipsis"
          onClick={onCardClickHandler}
        >
          <div className="text-[12px]">
            구역번호.{card.idx} {card.name}
          </div>
          <div>
            가구수.{cardContent.length}곳 / 올 해 사용한 횟수.
            {cardAssigned.length}회
          </div>
          <div>마지막 완료 날짜.{lastDateCompleted}</div>
        </div>
        <div className="border-b border-black mx-1 my-1"></div>
        <div className="flex">
          <Button
            className="w-auto h-[25px] border-2 px-1 py-0 mr-1 bg-violet-400"
            onClick={onViewClickHandler}
          >
            상세보기
          </Button>
          <Button
            className="w-auto h-[25px] border-2 px-1 py-0 mr-1 bg-emerald-500"
            onClick={onDownloadClickHandler}
          >
            다운로드
          </Button>
          {cardBackup.length > 0 && (
            <Button
              className="w-auto h-[25px] border-2 px-1 py-0 bg-primary-200"
              onClick={onRollbackCardHandler}
            >
              복구
            </Button>
          )}
          <div className="flex-1 w-auto h-auto" onClick={onCardClickHandler} />
        </div>
      </div>
    </>
  );
};

export default TerritoryCardLabel;
