import React from "react";
import loadingImg from "../../../assets/images/loading.gif";
import Body from "../../atoms/Body";

const SuspenseLayout = () => {
  return (
    <Body className="animate-naviToNotFound flex items-center font-display">
      <div className="m-auto text-center">
        <div>
          <img
            className="w-24 h-24 m-auto mb-2"
            src={loadingImg}
            alt="loading image"
            width={192}
            height={192}
          />
        </div>
        <div>페이지를 불러오는 중</div>
      </div>
    </Body>
  );
};

export default SuspenseLayout;
