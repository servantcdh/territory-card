import React, { useCallback } from "react";
import Frame from "../../atoms/Frame";
import { useNavigate } from "react-router-dom";
import Svg from "../../atoms/Svg";

const TerritoryCard = ({
  className,
  childClassName,
  titleClassName,
  children,
  title,
}) => {
  const navigate = useNavigate();
  const onBackClickHandler = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <Frame
      className={`before:w-[calc(100%-1rem)] before:h-[calc(100%-3rem)] before:left-3 lg:before:left-[calc(100%/2-188px)] before:top-6 ${className}`}
      childClassName={`mx-auto w-[calc(100%-1rem)] h-[calc(100%-3rem)] p-2 my-5 ${childClassName}`}
    >
      {title && (
        <div
          className={`ml-2 text-2xl ${
            titleClassName ? titleClassName : "text-primary-200"
          } mb-1 flex`}
        >
          <Svg onClick={onBackClickHandler} className="w-6 h-6 mt-1 -ml-4 animate-shakeLeft" type="chevronLeft" />
          <span>{title}</span>
        </div>
      )}
      {children}
    </Frame>
  );
};

export default TerritoryCard;
