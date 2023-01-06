import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import ViewLayout from "../../components/templates/ViewLayout";
import useCardQuery from "../../hooks/query/card/useCardQuery";
import useCardMutation from "../../hooks/query/card/useCardMutation";
import useAssignedCardQuery from "../../hooks/query/assign/useAssignedCardQuery";


const ViewPage = () => {
  const { cardIdx, cardAssignedIdx } = useParams();
  const { status: cardStatus, data: cardData } = useCardQuery(cardIdx);
  const { status: assignedStatus, data: assignedData } =
    useAssignedCardQuery(cardAssignedIdx);
  const { mutate: cardMutate } = useCardMutation();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("myInfo");
  const userIdx = user ? user.userIdx : 0;
  const users = [];
  let address = "";
  if (assignedData) {
    assignedData.crewAssigned.forEach((crew) => users.push(crew.user));
    const { street } = assignedData.card.cardContent[0];
    address = street;
  }
  const onMemoChangeHander = useCallback(
    (memo) => {
      if (cardData) {
        cardMutate({
          idx: cardData.idx,
          name: cardData.name,
          status: cardData.status,
          memo,
        });
      }
    },
    [cardMutate, cardData]
  );
  return (
    <ViewLayout
      cardStatus={cardStatus}
      cardData={cardData}
      assignedStatus={assignedStatus}
      assignedData={assignedData}
      users={users}
      userIdx={userIdx}
      address={address}
      onMemoChange={onMemoChangeHander}
    />
  );
};

export default ViewPage;
