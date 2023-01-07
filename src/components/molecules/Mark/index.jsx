import React, { useCallback, useState } from "react";
import Svg from "../../atoms/Svg";
import Modal from "../Modal";

const Mark = ({ id, markType, checked, onCheck }) => {
  const [activeModal, setActiveModal] = useState(false);
  let className = "";
  let svgType = "";
  if (markType === 2) {
    svgType = "smile";
    if (checked) {
      className = "bg-emerald-600";
    } else {
      className = "bg-emerald-900";
    }
  }
  if (markType === 3) {
    svgType = "hand";
    if (checked) {
      className = "bg-red-600";
    } else {
      className = "bg-red-900";
    }
  }
  const onClickHandler = useCallback(() => {
    if (!checked && markType === 3) {
      setActiveModal(true);
    } else {
      onCheck(checked ? 1 : markType);
    }
  }, [markType, checked, onCheck, setActiveModal]);
  const onConfirmHandler = useCallback(() => {
    onCheck(checked ? 1 : markType);
    setActiveModal(false);
  }, [onCheck, checked, markType, setActiveModal]);
  const onCancelHandler = useCallback(() => {
    setActiveModal(false);
  }, [setActiveModal]);
  return (
    <>
      {activeModal && (
        <Modal
          title="방문을 거절당하셨나요?"
          onConfirm={onConfirmHandler}
          onCancel={onCancelHandler}
          buttonName="방문거절"
          cancelName="취소"
        >
          <p className="mb-3">
            이 곳을 <span className="text-red-500">방문거절</span>로
            기록하시려면{" "}
            <span className="border-[3px] border-black px-1 bg-orange-400 rounded">
              방문거절
            </span>
            을 눌러주세요.
          </p>
          <p>
            ❗메모 박스에 자세한 상황을 기록하시면 다른 전도인들에게 도움이 됩니다.
          </p>
        </Modal>
      )}

      <button
        id={id}
        className={`p-1 ${
          markType === 3 ? "" : "mr-1"
        } rounded ${className} text-primary-300`}
        onClick={onClickHandler}
      >
        <Svg type={svgType} />
      </button>
    </>
  );
};

export default Mark;
