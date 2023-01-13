import React, { useCallback } from "react";

const Column = ({ className, children, isLast }) => {
  return (
    <>
      <div className={`break-all flex items-center ${className}`}>
        <div className="mx-auto">{children}</div>
      </div>
      {!isLast && (
        <div className="border-r border-dashed border-primary-400 mx-1"></div>
      )}
    </>
  );
};

const Row = ({ className, columns, header, firstRow, divide }) => {
  return (
    <div
      className={`bg-amber-200 ${!columns ? "rounded" : ""} ${
        firstRow ? "rounded-t" : ""
      } ${divide ? "rounded-b mb-2" : ""} w-auto h-13 p-2 ${className}`}
    >
      {!!columns && (
        <>
          {firstRow && header && <div className="mb-1">{header}</div>}
          <div className="border border-dashed bg-orange-50 border-primary-400 w-full h-full p-2 flex">
            {columns.map((content, index) => (
              <Column
                key={`col_${index}`}
                className={`text-[11.5px] ${index === 2 ? "flex-auto w-[16px]" : "flex-1"}`}
                isLast={columns.length - 1 === index}
              >
                {content}
              </Column>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Row;
