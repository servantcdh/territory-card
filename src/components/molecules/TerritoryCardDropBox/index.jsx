import React from "react";
import Svg from "../../atoms/Svg";

const TerritoryCardDropBox = () => {
  return (
    <div className="w-full h-full bg-red-400 flex items-center rounded-sm text-2xl">
      <div className="m-auto w-36 border-4 border-primary-900 rounded-lg text-center p-1 py-4 animate-scale">
        <Svg className="w-20 block m-auto animate-bounce" type="table" />
        <p>
          드롭해서
          <br />
          카드함에 추가
        </p>
      </div>
    </div>
  );
};

export default TerritoryCardDropBox;
