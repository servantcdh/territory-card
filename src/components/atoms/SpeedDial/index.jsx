import React, { useState } from "react";
import Svg from "../Svg";

const SpeedDial = (props) => {
  const { items } = props;
  const [active, setActive] = useState(false);
  const onClickDialHandler = () => {
    setActive((prev) => !prev);
  };
  return (
    <div>
      <div className="fixed bottom-24 m-3 right-0 w-20 h-80 bg-red-100">
        {!!items.length &&
          items.map((item, idx) => (
            <div key={idx} className="mb-1 rounded-full w-20 h-20 bg-orange-300 hover:bg-orange-400 border-8 border-black"></div>
          ))}
      </div>
      <div className="fixed bottom-0.5 m-3 right-0 w-20 h-20 animate-focusOutX hover:animate-focusX">
        <div
          className="rounded-full w-full h-full bg-orange-500 hover:bg-orange-600 border-8 border-black"
          onClick={onClickDialHandler}
        >
          <Svg className="w-18 h-18" type="plus" />
        </div>
      </div>
    </div>
  );
};

export default SpeedDial;
