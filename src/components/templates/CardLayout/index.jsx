import React, { useCallback, useState } from "react";
import Body from "../../atoms/Body";
import Container from "../../atoms/Container";
import TerritoryCard from "../../molecules/TerritoryCard";
import TagBox from "../../molecules/TagBox";
import TerritoryCardStoreBox from "../../molecules/TerritoryCardStoreBox";
import TerritoryCardLabel from "../../molecules/TerritoryCardLabel";
import TerritoryCardLabelBox from "../../molecules/TerritoryCardLabelBox";
import TerritoryCardControlBox from "../../molecules/TerritoryCardControlBox";
import TerritoryCardStoreContainer from "../../organisms/TerritoryCardStoreContainer";

const CardLayout = ({
  cardsData,
  tagsData,
  onTagChange,
  onRollbackCard,
  onAssignClick,
}) => {
  /**
   * 카드레이아웃 h-auto
   *   -구역카드함
   *   타이틀
   *   태그스크롤박스 - 태그
   *   구역카드함박스
   *        구역카드스크롤박스
   *                구역카드라벨 - 토글(색상)
   *                    구역번호, 이름, 마지막으로 완료한 날짜, 상세보기, 다운로드, 비활성화, 복구
   *        컨트롤박스
   *                꺼내기(최하단스크롤), 초기화
   *   -배정현황
   *   타이틀
   *   구역카드스크롤박스
   *        전도인배정모달
   *        구역카드 라벨
   *            진행상태, 구역번호, 이름, 프로필스택, 상세보기, 전도인배정, 회수
   */
  const [checkeds, setCheckeds] = useState([]);
  const onCardClickHandler = useCallback(
    (cardIdx, checked) => {
      if (checked) {
        const filtereds = checkeds.filter((idx) => idx !== cardIdx);
        setCheckeds(filtereds);
      } else {
        const cloneds = [...checkeds];
        cloneds.push(cardIdx);
        setCheckeds(cloneds);
      }
    },
    [checkeds, setCheckeds]
  );
  const onResetClickHandler = useCallback(() => {
    setCheckeds([]);
  }, [setCheckeds]);
  const onAssignClickHandler = useCallback(() => {
    onAssignClick(checkeds);
    setCheckeds([]);
  }, [checkeds, setCheckeds, onAssignClick]);
  return (
    <Body className="h-auto overflow-y-scroll animate-naviToCard">
      <Container className="h-[calc(98vh)] relative">
        <TerritoryCard
          className="my-0 animate-fadeIn"
          childClassName="mb-0"
          title="구역카드함"
        >
          <TerritoryCardStoreContainer>
            <TagBox
              className="mb-2"
              tagsData={tagsData}
              onChange={onTagChange}
            />
            <TerritoryCardStoreBox>
              <TerritoryCardLabelBox className="flex-auto">
                {cardsData &&
                  cardsData.map((card) => (
                    <TerritoryCardLabel
                      key={`cardLabel_${card.idx}`}
                      card={card}
                      checkedCard={checkeds.includes(card.idx)}
                      onCardClick={onCardClickHandler}
                      onRollbackCard={onRollbackCard}
                    />
                  ))}
              </TerritoryCardLabelBox>
              <div className="flex-none border-r border-dashed border-primary-400 mx-1"></div>
              <TerritoryCardControlBox
                className="w-[60px]"
                checked={checkeds.length > 0}
                onAssign={onAssignClickHandler}
                onReset={onResetClickHandler}
              />
            </TerritoryCardStoreBox>
          </TerritoryCardStoreContainer>
        </TerritoryCard>
      </Container>
      <Container className="h-[calc(90vh)] my-0 relative">
        <TerritoryCard
          className="my-0 animate-fadeIn before:top-0"
          childClassName="-top-6 bg-sky-800"
          title="배정현황"
        >
          <TerritoryCardStoreContainer className="bg-sky-700">
            {/* <AssignStatusBox>
          <ProfileCardList />
          <CardAssignedLabelBox />
        </AssignStatusBox> */}
          </TerritoryCardStoreContainer>
        </TerritoryCard>
      </Container>
    </Body>
  );
};

export default CardLayout;
