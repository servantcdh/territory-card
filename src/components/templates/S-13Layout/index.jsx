import React, { useCallback } from "react";
import Body from "../../atoms/Body";
import Button from "../../atoms/Button";
import Container from "../../atoms/Container";
import Row from "../../atoms/Row";
import TerritoryCard from "../../molecules/TerritoryCard";
import TerritoryS13Header from "../../molecules/TerritoryS13Header";
import TerritoryS13Content from "../../molecules/TerritoryS13Content";

const S13Layout = ({ s13Data, onServiceYearSelect, onDownload }) => {
  const onChangeHandler = useCallback(
    (e) => {
      const serviceYear = e.target.value;
      if (serviceYear) {
        onServiceYearSelect(serviceYear);
      }
    },
    [onServiceYearSelect]
  );
  return (
    <Body className="animate-naviToS13 p-1">
      <Container className="h-[calc(90vh)]">
        <TerritoryCard
          className="my-0 animate-fade before:top-6 before:bg-gray-700"
          childClassName="-top-0 bg-amber-100"
          titleClassName="text-primary-800"
          title="구역배정기록"
        >
          <div className="mb-3">
            <select
              id="serviceYearSelect"
              defaultValue=""
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
              onChange={onChangeHandler}
            >
              <option value="" disabled>
                봉사연도를 선택하세요
              </option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>
          <div className="mb-1">
            <Button
              className="text-sm rounded-lg border-2 px-1 py-[2px] text-primary-800"
              onClick={onDownload}
              disabled={!s13Data.length}
            >
              다운로드
            </Button>
          </div>
          {s13Data.length > 0 && (
            <div className="overflow-y-scroll text-primary-800 bg-amber-200 h-auto max-h-[calc(100%-125px)] p-1">
              <div className="border border-dashed h-full border-primary-400">
                <TerritoryS13Header className="bg-amber-200 mb-0" />
                {s13Data.map(
                  (
                    {
                      cardIdx,
                      card,
                      lastDateCompleted,
                      territoryRecordContent,
                    },
                    index
                  ) => {
                    return (
                      <div key={`s13_${cardIdx}`}>
                        {territoryRecordContent.map((content) => (
                          <TerritoryS13Content
                            key={`s13Content_${content.idx}`}
                            className="bg-amber-300"
                            header={
                              <>
                                <div>
                                  구역번호.{cardIdx} {card.name}
                                </div>
                                <div className="text-[13px]">
                                  마지막으로 완료한 날짜. {lastDateCompleted}
                                </div>
                              </>
                            }
                            content={content}
                            firstRow={
                              index === 0 ||
                              cardIdx !== s13Data[index - 1].cardIdx
                            }
                            divide={
                              s13Data.length - 1 === index ||
                              cardIdx !== s13Data[index + 1].cardIdx
                            }
                          />
                        ))}
                        <Row className="bg-amber-200" />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </TerritoryCard>
      </Container>
    </Body>
  );
};

export default S13Layout;
