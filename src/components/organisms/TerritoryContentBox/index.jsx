import React, { useCallback } from "react";
import Row from "../../atoms/Row";
import TerritoryContent from "../../molecules/TerritoryContent";
import TerritoryContentHeader from "../../molecules/TerritoryContentHeader";

const TerritoryContentBox = ({
  className,
  cardContent,
  cardRecord,
  onMark,
  userIdx,
}) => {
  const onMarkHandler = useCallback(
    (cardContentIdx, cardMarkIdx) => {
      onMark(cardContentIdx, cardMarkIdx);
    },
    [onMark]
  );
  return (
    <div
      className={`bg-cyan-500 rounded-lg w-auto h-[calc(100%-17rem)] overflow-y-scroll p-3 text-primary-700 ${className}`}
    >
      <TerritoryContentHeader className="" />
      {!!cardContent &&
        cardContent.map((content, index) => (
          <TerritoryContent
            key={`cardContent_${content.idx}`}
            content={content}
            cardRecord={cardRecord}
            firstRow={
              index === 0 || content.street !== cardContent[index - 1].street
            }
            divide={
              cardContent.length - 1 === index ||
              content.street !== cardContent[index + 1].street
            }
            onMark={onMarkHandler}
            userIdx={userIdx}
          />
        ))}
      <Row />
    </div>
  );
};

export default TerritoryContentBox;
