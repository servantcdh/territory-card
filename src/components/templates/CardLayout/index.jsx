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
  uploadProgress,
}) => {
  const users = usersData ? usersData : [];
  const [checkedCards, setCheckedCards] = useState([]);
  const [cardFiles, setCardFiles] = useState(null);
  const { dragAreaRef, isDragging, files: cardFilesReady } = useDragAndDrop();
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
    onUploadCard(cardFiles, setCardFiles);
  }, [cardFiles]);
  const onCancelModalHandler = useCallback(() => {
    setCardFiles(null);
  }, []);
  const onInputFileChangeHandler = useCallback((e) => {
    const selectFiles = e.target.files;
    setCardFiles(selectFiles);
    e.target.files = null;
    e.target.value = null;
  }, []);
  useEffect(() => {
    if (cardFilesReady) {
      setCardFiles(cardFilesReady);
    }
  }, [cardFilesReady]);
  const excelNames = [];
  if (cardFiles) {
    for (let i = 0; i < cardFiles.length; i++) {
      excelNames.push(cardFiles[i].name);
    }
  }
  return (
    <Body className="h-auto overflow-y-scroll scrollbar-hide md:flex md:items-center md:inset-x-0 lg:flex lg:items-center lg:inset-x-0 animate-naviToCard">
      <Input
        type="file"
        multiple={true}
        id={fileInputId}
        accept=".xlsx"
        className="hidden"
        onChange={onInputFileChangeHandler}
      />
      {cardFiles && (
        <Modal
          className={`bg-amber-200 ${uploadProgress ? "animate-cloudy" : ""}`}
          title="다음의 구역 카드를 업로드합니다."
          onConfirm={onConfirmModalHandler}
          onCancel={!uploadProgress ? onCancelModalHandler : null}
          buttonName={`${!uploadProgress ? "전송하기" : (uploadProgress < 1 ? "전송중" : "변환중")}`}
          cancelName={`${!uploadProgress ? "취소" : ""}`}
          buttonDisabled={uploadProgress > 0}
        >
          <div className="text-display">
            {excelNames.length > 0 &&
              excelNames.map((name) => <p key={name}>{name}</p>)}
          </div>
        </Modal>
      )}
      <div className="md:m-auto md:flex lg:m-auto lg:flex">
        <Container className="h-[98vh] md:w-[calc(50vw-20px)] m-auto relative">
          <TerritoryCard
            className="my-0 animate-fadeIn md:relative lg:relative"
            childClassName="mb-0 md:relative lg:relative"
            title="구역카드함"
          >
            <TerritoryCardStoreContainer className="md:h-[55.2rem] lg:h-[55.2rem]">
              <TagBox
                className="mb-2"
                tagsData={tagsData}
                onChange={onTagChangeHandler}
              />
              <TerritoryCardStoreBox className="h-[66vh] md:h-[48.75rem] lg:h-[48.75rem]">
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
        <Container
          htmlRef={scrollRef}
          className="h-[90vh] md:w-[calc(50vw-20px)] m-auto my-0 relative"
        >
          <TerritoryCard
            className="my-0 animate-fade before:top-0 md:relative md:before:top-6 lg:relative lg:before:top-6"
            childClassName="-top-6 bg-sky-800 md:relative md:top-0 lg:relative lg:top-0"
            title="배정현황"
          >
            <TerritoryCardStoreContainer className="bg-sky-700 md:h-[55.2rem] lg:h-[55.2rem]">
              <TerritoryAssignCardBox
                className="h-[67.5vh] md:h-[52.65rem] lg:h-[52.65rem]"
                childClassName="overflow-y-scroll scrollbar-hide"
              >
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
      </div>
    </Body>
  );
};

export default CardLayout;
