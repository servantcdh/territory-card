import React, { useCallback, useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import Svg from "../../atoms/Svg";

const Backdrop = ({ onClose }) => {
  const onClickHandler = useCallback(() => onClose(), [onClose]);
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen"
      onClick={onClickHandler}
    />
  );
};

const SpeedDial = ({ items }) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const isMainPage = useMatch("/");
  const onClickDialHandler = useCallback(
    () => setActive((prev) => !prev),
    [setActive]
  );
  const onClickRouteHandler = useCallback(
    (route) => {
      navigate(route);
      onClickDialHandler();
    },
    [navigate, onClickDialHandler]
  );
  const animateShow = active ? "animate-showUp" : "";
  const animateRotate = active
    ? "animate-rotate45"
    : isMainPage
    ? "animate-rotate45"
    : "animate-rotate0";
  const onClickCloseHandler = useCallback(() => setActive(false), [setActive]);
  return (
    <div>
      {active && <Backdrop onClose={onClickCloseHandler} />}
      {active && (
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
      )}
      <div
        className={`fixed bottom-1 m-3 right-0 w-20 h-20 ${
          isMainPage ? "animate-scale" : ""
        }`}
      >
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
