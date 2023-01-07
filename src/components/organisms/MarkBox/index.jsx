import React, { useCallback, useEffect, useState } from "react";
import Mark from "../../molecules/Mark";

const MarkBox = ({ cardContentIdx, cardMarkIdx, isUpdate , onChange }) => {
  const [mark, setMark] = useState(cardMarkIdx);
  const markList = [
    {
      type: 2, // 만남
      checked: false,
    },
    {
      type: 3, // 방문금지
      checked: false,
    },
  ];
  const onCheckHandler = useCallback((cardMarkIdx) => {
    setMark(cardMarkIdx);
    onChange(cardContentIdx, cardMarkIdx);
  }, [setMark, onChange]);
  markList.forEach((m) => (m.checked = m.type === mark));
  useEffect(() => {
    if (isUpdate) {
      setMark(cardMarkIdx);
    }
  }, [cardMarkIdx, isUpdate, setMark])
  return (
    <>
      {markList.map((m) => (
        <Mark
          key={`${cardContentIdx}_${m.type}`}
          markType={m.type}
          checked={m.checked}
          onCheck={onCheckHandler}
        />
      ))}
    </>
  );
};

export default MarkBox;
