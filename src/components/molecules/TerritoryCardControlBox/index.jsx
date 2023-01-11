import React, { useCallback } from "react";
import Button from "../../atoms/Button";
import { excelFormApi } from "../../../hooks/api/file";

const TerritoryCardControlBox = ({ className, onAssign, onReset, onUploadClick, checked }) => {
  const onExcelDownloadClickHandler = useCallback(() => {
    excelFormApi();
  }, []);
  return (
    <div className={` ${className}`}>
      <Button
        className={`w-full h-[32px] border-2 px-0 py-0 ${
          checked ? "bg-violet-500" : "bg-violet-700 text-gray-700"
        }  mb-1`}
        onClick={onAssign}
        disabled={!checked}
      >
        담기
      </Button>
      <Button
        className={`w-full h-[32px] border-2 px-0 py-0 ${
          checked ? "bg-primary-300" : "bg-primary-600 text-gray-700"
        } mb-1`}
        onClick={onReset}
        disabled={!checked}
      >
        초기화
      </Button>
      <Button
        className="w-full h-[32px] border-2 px-0 py-0 bg-emerald-500 mb-1"
        onClick={onExcelDownloadClickHandler}
      >
        엑셀폼
      </Button>
      <Button
        className="w-full h-[32px] border-2 px-0 py-0 bg-red-400"
        onClick={onUploadClick}
      >
        업로드
      </Button>
    </div>
  );
};

export default TerritoryCardControlBox;
