import React, { useCallback, useState } from "react";
import Profile from "../../atoms/Profile";
import Row from "../../atoms/Row";
import Svg from "../../atoms/Svg";
import MarkBox from "../../organisms/MarkBox";
import Modal from "../Modal";

const TerritoryContent = ({
  className,
  content,
  cardRecord,
  firstRow,
  divide,
  onMark,
  userIdx,
}) => {
  const [activeModal, setIsActiveModal] = useState(false);
  const onMarkChangeHandler = useCallback(
    (cardContentIdx, cardMarkIdx) => {
      onMark(cardContentIdx, cardMarkIdx);
    },
    [onMark]
  );
  const onRowClickHandler = useCallback(() => {
    if (phone) {
      setIsActiveModal(true);
    }
  }, [setIsActiveModal, phone]);
  const onConfirmHandler = useCallback(() => {
    setIsActiveModal(false);
  }, [setIsActiveModal]);
  const { idx, street, building, name, phone, refusal } = content;
  const record = cardRecord.find((record) => record.cardContentIdx === idx);
  const { cardMarkIdx, crewAssigned } = record
    ? record
    : { cardMarkIdx: 1, crewAssigned: null };
  const { user } = crewAssigned ? crewAssigned : { user: null };
  const columns = [
    <p onClick={onRowClickHandler}>{building}</p>,
    <p onClick={onRowClickHandler}>{name}</p>,
    <MarkBox
      cardContentIdx={idx}
      cardMarkIdx={cardMarkIdx}
      isUpdate={user && userIdx !== user.idx}
      onChange={onMarkChangeHandler}
    />,
    <Profile className="w-9 h-9" {...user} />,
  ];
  return (
    <>
      {activeModal && (
        <Modal
          title={`전화 봉사`}
          onConfirm={onConfirmHandler}
          buttonName="닫기"
        >
          <div className="m-3 p-2 text-primary-200 font-bold flex justify-center">
            <a
              className="flex w-[180px] rounded border-4 border-black p-2 bg-emerald-600"
              href={`tel:${phone}`}
            >
              <Svg type="phone" />
              &nbsp;{phone}
            </a>
          </div>
        </Modal>
      )}
      <Row
        className={`${refusal ? "bg-red-400" : ""} ${className}`}
        columns={columns}
        header={street}
        firstRow={firstRow}
        divide={divide}
        onClick={onRowClickHandler}
      />
    </>
  );
};

export default TerritoryContent;
