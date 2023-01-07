import React, { useCallback } from "react";

const Column = ({ className, children, isLast }) => {
  return (
    <>
      <div className={`break-all flex items-center ${className}`}>
        <div className="">{children}</div>
      </div>
      {!isLast && (
        <div className="border-r border-dashed border-primary-600 mx-3"></div>
      )}
    </>
  );
};

const Row = ({ className, columns, header, firstRow, divide, onClick }) => {
  const onClickHandler = useCallback(() => {
    onClick();
  }, [onClick]);
  return (
    <div
      className={`bg-amber-200 ${!columns ? "rounded" : ""} ${
        firstRow ? "rounded-t" : ""
      } ${divide ? "rounded-b mb-2" : ""} w-auto h-13 p-2 ${className}`}
      onClick={onClickHandler}
    >
      {!!columns && (
        <>
          {firstRow && header && <div className="mb-1">{header}</div>}
          <div className="border border-dashed bg-orange-50 border-primary-600 w-full h-full p-2 flex">
            {columns.map((content, index) => (
              <Column
                key={`col_${index}`}
                className={`${index === 2 ? "flex-auto w-[16px]" : "flex-1"}`}
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
