import React, { useState } from "react";
import Mark from "../../atoms/Mark";

const MarkBox = (props) => {
  const [mark, setMark] = useState(0);
  const markList = [
    {
      type: 1, // 만남
      checked: false,
    },
    {
      type: 2, // 방문금지
      checked: false,
    },
  ];
  const onCheckHandler = (mark) => {
    console.log(mark);
    setMark(mark);
  };
  markList.forEach((m) => (m.checked = m.type === mark));
  return (
    <>
      {markList.map((m) => (
        <Mark
          key={`${props.cardContentIdx}_${m.type}`}
          markType={m.type}
          checked={m.checked}
          onCheck={onCheckHandler}
        />
      ))}
    </>
  );
};

export default MarkBox;
