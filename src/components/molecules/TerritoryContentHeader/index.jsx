import React from "react";
import Row from "../../atoms/Row";

const TerritoryContentHeader = ({ className }) => {
  const columns = ["건물(동)", "상호(호)", "방문기록", "전도인"];
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
