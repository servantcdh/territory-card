import React, { useCallback } from "react";
import Svg from "../../atoms/Svg";

const Mark = ({ id, markType, checked, onCheck }) => {
  let className = "";
  let svgType = "";
  if (markType === 1) {
    svgType = "smile";
    if (checked) {
      className = "bg-emerald-600";
    } else {
      className = "bg-emerald-900";
    }
  }
  if (markType === 2) {
    svgType = "hand";
    if (checked) {
      className = "bg-red-600";
    } else {
      className = "bg-red-900";
    }
  }
  const onClickHandler = useCallback(() => {
    onCheck(checked ? 0 : markType);
  }, [checked, markType]);
  return (
    <button
      id={id}
      className={`p-1 rounded ${className} text-primary-300`}
      onClick={onClickHandler}
    >
      <Svg type={svgType} />
    </button>
  );
};

export default Mark;
