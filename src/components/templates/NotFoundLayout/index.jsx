import React from "react";
import Body from "../../atoms/Body";
import Svg from "../../atoms/Svg";

const NotFoundLayout = () => {
  return (
    <Body className="animate-naviToNotFound flex items-center font-display">
      <div className="m-auto text-center">
        <div><Svg className="w-24 h-24 m-auto mb-2" type="question" /></div>
        <div>404 NOT FOUND</div>
        <div>페이지를 찾을 수 없습니다!</div>
      </div>
    </Body>
  );
};

export default NotFoundLayout;
