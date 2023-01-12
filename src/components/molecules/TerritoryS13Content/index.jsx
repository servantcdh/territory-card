import React, { useCallback, useState } from "react";
import Profile from "../../atoms/Profile";
import Row from "../../atoms/Row";

const TerritoryS13Content = ({
  className,
  header,
  content,
  firstRow,
  divide,
}) => {
  const { user, dateAssigned, dateCompleted } = content;
  const columns = [
    <>
      <div className="flex items-center">
        <p className="mr-2">{user.name}</p>
        <Profile className="w-9 h-9" {...user} />
      </div>
    </>,
    <p className="w-24">{dateAssigned}</p>,
    <p className="w-24">{dateCompleted}</p>,
  ];
  return (
    <Row
      className={` ${className}`}
      columns={columns}
      header={header}
      firstRow={firstRow}
      divide={divide}
    />
  );
};

export default TerritoryS13Content;
