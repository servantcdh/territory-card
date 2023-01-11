import React, { useCallback, useEffect, useState } from "react";
import Body from "../../atoms/Body";
import Container from "../../atoms/Container";
import TerritoryCard from "../../molecules/TerritoryCard";
import TagBox from "../../molecules/TagBox";
import TerritoryCardDropBox from "../../molecules/TerritoryCardDropBox";
import TerritoryCardStoreBox from "../../molecules/TerritoryCardStoreBox";
import TerritoryCardLabel from "../../molecules/TerritoryCardLabel";
import TerritoryCardLabelBox from "../../molecules/TerritoryCardLabelBox";
import TerritoryCardControlBox from "../../molecules/TerritoryCardControlBox";
import TerritoryCardStoreContainer from "../../organisms/TerritoryCardStoreContainer";
import ProfileCardList from "../../organisms/ProfileCardList";
import useDragAndDrop from "../../../hooks/dragAndDrop/useDragAndDrop";
import Input from "../../atoms/Input";
import Modal from "../../molecules/Modal";

const CardLayout = ({
  cardsData,
  tagsData,
  usersData,
  onTagChange,
  onRollbackCard,
  onAssignCardsClick,
  onAssignCrewsClick,
  onSearchUser,
  onUploadCard,
  scrollRef,
}) => {
  const users = usersData ? usersData : [];
  const [cardAssignedIdx, setCardAssignedIdx] = useState(0);
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
    onAssignCardsClick(checkedCards);
    setCheckedCards([]);
  }, [checkedCards, setCheckedCards, onAssignCardsClick]);
  const onAssignCrewClickHandler = useCallback((users) => {
    console.log(users);
    // onAssignCrewsClick(cardAssignedIdx, )
  }, [cardAssignedIdx, onAssignCrewsClick]);
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
      {/**
       *   -배정현황
       *   타이틀
       *   구역카드스크롤박스
       *        구역카드 라벨
       *            진행상태, 구역번호, 이름, 프로필스택, 상세보기, 전도인배정, 회수
       */}
      <Container htmlRef={scrollRef} className="h-[calc(90vh)] my-0 relative">
        <TerritoryCard
          className="my-0 animate-fadeIn before:top-0"
          childClassName="-top-6 bg-sky-800"
          title="배정현황"
        >
          <TerritoryCardStoreContainer className="bg-sky-700">
            <TerritoryCardStoreBox>
              {cardAssignedIdx > 0 && (
                <ProfileCardList
                  users={users}
                  onAssign={onAssignCrewClickHandler}
                  onSearch={onSearchUser}
                />
              )}
              {/* <CardAssignedLabelBox /> */}
            </TerritoryCardStoreBox>
          </TerritoryCardStoreContainer>
        </TerritoryCard>
      </Container>
    </Body>
  );
};

export default CardLayout;
