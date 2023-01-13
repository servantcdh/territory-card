import React from "react";
import Row from "../../atoms/Row";

const TerritoryContentHeader = ({ className }) => {
  const columns = ["배정된 전도인", "배정 날짜", "완료 날짜"];
  return (
    <Row
      className={`pt-1 ${className}`}
      columns={columns}
      firstRow={true}
      divide={true}
    />
  );
};

export default TerritoryContentHeader;
