import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Svg from "../../atoms/Svg";

const SpeedDial = ({ items }) => {
  const [active, setActive] = useState(false);
  const onClickDialHandler = () => {
    setActive((prev) => !prev);
  };
  const navigate = useNavigate();
  const onClickRouteHandler = (route) => {
    navigate(route);
    onClickDialHandler();
  };
  const animateShow = active ? "animate-showUp" : "translate-y-550 opacity-0";
  const animateRotate = active ? "animate-rotate45" : "";
  return (
    <div>
      <div className="fixed bottom-24 m-3 right-0 w-20">
        {!!items.length &&
          items.map((item, idx) => (
            <div
              key={`dial_${idx}`}
              className={`mb-1 rounded-full w-20 h-20 bg-orange-300 hover:bg-orange-400 border-8 border-black ${animateShow}`}
              onClick={
                item.callback
                  ? item.callback
                  : onClickRouteHandler.bind(null, item.route)
              }
            >
              <Svg className="w-12 h-12 m-auto mt-2" type={item.svg} />
            </div>
          ))}
      </div>
      <div className="fixed bottom-1 m-3 right-0 w-20 h-20 animate-scale">
        <div
          className={`rounded-full w-full h-full bg-orange-500 border-8 border-black ${animateRotate}`}
          onClick={onClickDialHandler}
        >
          <Svg className="w-18 h-18 m-auto" type="plus" />
        </div>
      </div>
    </div>
  );
};

export default SpeedDial;
