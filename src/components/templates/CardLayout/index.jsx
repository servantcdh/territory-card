import React, { useCallback, useEffect, useState } from "react";
import useDragAndDrop from "../../../hooks/dragAndDrop/useDragAndDrop";
import Body from "../../atoms/Body";
import Input from "../../atoms/Input";
import Container from "../../atoms/Container";
import Modal from "../../molecules/Modal";
import TerritoryCard from "../../molecules/TerritoryCard";
import TagBox from "../../molecules/TagBox";
import TerritoryCardStoreContainer from "../../organisms/TerritoryCardStoreContainer";
import TerritoryCardStoreBox from "../../molecules/TerritoryCardStoreBox";
import TerritoryCardDropBox from "../../molecules/TerritoryCardDropBox";
import TerritoryCardLabel from "../../molecules/TerritoryCardLabel";
import TerritoryCardLabelBox from "../../molecules/TerritoryCardLabelBox";
import TerritoryCardControlBox from "../../molecules/TerritoryCardControlBox";
import TerritoryAssignCard from "../../molecules/TerritoryAssignCard";
import TerritoryAssignCardBox from "../../molecules/TerritoryAssignCardBox";

const CardLayout = ({
  cardsData,
  tagsData,
  assignedCardsData,
  usersData,
  onTagChange,
  onRollbackCard,
  onAssignCards,
  onAssignCrews,
  onSearchUser,
  onUploadCard,
  onRetrieve,
  scrollRef,
}) => {
  const users = usersData ? usersData : [];
  const [checkedCards, setCheckedCards] = useState([]);
  const [cardFile, setCardFile] = useState(null);
  const { dragAreaRef, isDragging, file: cardFileReady } = useDragAndDrop();
  const fileInputId = "fileInput";
  const onTagChangeHandler = useCallback(
    (tags, tagsIgnored) => {
      onTagChange(tags, tagsIgnored, setCheckedCards);
    },
    [setCheckedCards, onTagChange]
  );
  const onCardClickHandler = useCallback(
    (cardIdx, checked) => {
      if (checked) {
        const filtereds = checkedCards.filter((idx) => idx !== cardIdx);
        setCheckedCards(filtereds);
      } else {
        const cloneds = [...checkedCards];
        cloneds.push(cardIdx);
        setCheckedCards(cloneds);
      }
    },
    [checkedCards, setCheckedCards]
  );
  const onResetClickHandler = useCallback(() => {
    setCheckedCards([]);
  }, [setCheckedCards]);
  const onAssignCardClickHandler = useCallback(() => {
    onAssignCards(checkedCards);
    setCheckedCards([]);
  }, [checkedCards, setCheckedCards, onAssignCards]);
  const onAssignCrewHandler = useCallback(
    (cardAssignedIdx, crewInfo) => {
      onAssignCrews(cardAssignedIdx, crewInfo);
    },
    [onAssignCrews]
  );
  const onUploadClickHandler = useCallback(() => {
    document.getElementById(fileInputId).click();
  }, [fileInputId]);
  const onConfirmModalHandler = useCallback(() => {
    onUploadCard(cardFile, setCardFile);
  }, [cardFile]);
  const onCancelModalHandler = useCallback(() => {
    setCardFile(null);
  }, []);
  const onInputFileChangeHandler = useCallback((e) => {
    const selectFile = e.target.files[0];
    setCardFile(selectFile);
    e.target.files = null;
    e.target.value = null;
  }, []);
  useEffect(() => {
    if (cardFileReady) {
      setCardFile(cardFileReady);
    }
  }, [cardFileReady]);
  return (
    <Body className="h-auto overflow-y-scroll animate-naviToCard">
      <Input
        type="file"
        multiple={false}
        id={fileInputId}
        accept=".xlsx"
        className="hidden"
        onChange={onInputFileChangeHandler}
      />
      {cardFile && (
        <Modal
          className="bg-amber-200"
          title="다음의 구역 카드를 업로드합니다."
          onConfirm={onConfirmModalHandler}
          onCancel={onCancelModalHandler}
          buttonName="전송하기"
          cancelName="취소"
        >
          <div className="text-display">{cardFile.name}</div>
        </Modal>
      )}
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
              onChange={onTagChangeHandler}
            />
            <TerritoryCardStoreBox>
              <TerritoryCardLabelBox
                className="flex-auto"
                dragAreaRef={dragAreaRef}
                fileInputId={fileInputId}
              >
                {isDragging && <TerritoryCardDropBox />}
                {!isDragging &&
                  cardsData &&
                  cardsData.map((card) => (
                    <TerritoryCardLabel
                      key={`cardLabel_${card.idx}`}
                      card={card}
                      checkedCard={checkedCards.includes(card.idx)}
                      onCardClick={onCardClickHandler}
                      onRollbackCard={onRollbackCard}
                    />
                  ))}
              </TerritoryCardLabelBox>
              <div className="flex-none border-r border-dashed border-primary-400 mx-1"></div>
              <TerritoryCardControlBox
                className="w-[60px]"
                checked={checkedCards.length > 0}
                onAssign={onAssignCardClickHandler}
                onReset={onResetClickHandler}
                onUploadClick={onUploadClickHandler}
              />
            </TerritoryCardStoreBox>
          </TerritoryCardStoreContainer>
        </TerritoryCard>
      </Container>
      <Container htmlRef={scrollRef} className="h-[calc(90vh)] my-0 relative">
        <TerritoryCard
          className="my-0 animate-fadeIn before:top-0"
          childClassName="-top-6 bg-sky-800"
          title="배정현황"
        >
          <TerritoryCardStoreContainer className="bg-sky-700">
            <TerritoryAssignCardBox childClassName="overflow-y-scroll">
              {assignedCardsData &&
                assignedCardsData.map((card) => (
                  <TerritoryAssignCard
                    key={`assignLabel_${card.idx}`}
                    users={users}
                    assignedCard={card}
                    onAssignCrew={onAssignCrewHandler}
                    onSearch={onSearchUser}
                    onRetrieve={onRetrieve}
                  />
                ))}
            </TerritoryAssignCardBox>
          </TerritoryCardStoreContainer>
        </TerritoryCard>
      </Container>
    </Body>
  );
};

export default CardLayout;
