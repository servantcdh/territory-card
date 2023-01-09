import React, { useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import { cardApi } from "../../hooks/api/card";
import { assignedCardApi } from "../../hooks/api/assign";
import ViewLayout from "../../components/templates/ViewLayout";
import useCardMutation from "../../hooks/query/card/useCardMutation";
import useRecordCardMutation from "../../hooks/query/record/useRecordCardMutation";
import useCompleteCardMutation from "../../hooks/query/assign/useCompleteCardMutation";

const ViewPage = () => {
  const { cardIdx, cardAssignedIdx } = useParams();
  const navigate = useNavigate();
  const results = useQueries({
    queries: [
      {
        queryKey: [`card/${cardIdx}`, cardIdx],
        queryFn: cardApi,
        refetchInterval: 2000,
      },
      {
        queryKey: [`assignedCard/${cardAssignedIdx}`, cardAssignedIdx],
        queryFn: assignedCardApi,
        refetchInterval: 2000,
      },
    ],
  });
  const { data: cardData } = results[0];
  const { data: assignedData } = results[1];
  const { mutate: cardMutate } = useCardMutation();
  const { mutate: recordMutate } = useRecordCardMutation();
  const { mutate: completeCardMutate } = useCompleteCardMutation();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["myInfo"]);
  const userIdx = user ? user.userIdx : 0;
  const users = [];
  let address = "";
  if (assignedData) {
    assignedData.crewAssigned.forEach((crew) => {
      const user = crew.user;
      const access = user ? user.access : null;
      const { live } = access ? access : { live: false };
      users.push({ ...user, live });
    });
    const { street } = assignedData.card.cardContent[0];
    address = street;
  }
  useEffect(() => {
    if (assignedData && assignedData.dateCompleted) {
      navigate("/");
    }
  }, [assignedData, navigate]);
  const onMemoChangeHandler = useCallback(
    (memo) => {
      if (cardData) {
        cardMutate({
          idx: cardData.idx,
          name: cardData.name,
          status: cardData.status,
          memoFocusUserIdx: cardData.memoFocusUserIdx,
          memo,
        });
      }
    },
    [cardMutate, cardData]
  );
  const onMemoFocusHandler = useCallback(
    (focused) => {
      cardMutate({
        idx: cardData.idx,
        name: cardData.name,
        status: cardData.status,
        memo: cardData.memo,
        memoFocusUserIdx: focused ? userIdx : 0,
      });
    },
    [cardMutate, cardData, userIdx]
  );
  const onMarkHandler = useCallback((cardContentIdx, cardMarkIdx) => {
    recordMutate(
      {
        cardAssignedIdx,
        cardContentIdx,
        cardMarkIdx,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([`card/${cardIdx}`, cardIdx]);
          queryClient.invalidateQueries([
            `assignedCard/${cardAssignedIdx}`,
            cardAssignedIdx,
          ]);
        },
      }
    );
  }, []);
  const onCompleteCardHandler = useCallback(() => {
    completeCardMutate({ cardAssignedIdx }, {
      onSuccess: () => {
        navigate("/");
      }
    });
  }, [completeCardMutate]);
  return (
    <>
      {cardData && assignedData && (
        <ViewLayout
          cardData={cardData}
          assignedData={assignedData}
          users={users}
          userIdx={userIdx}
          address={address}
          onMemoChange={onMemoChangeHandler}
          onMemoFocus={onMemoFocusHandler}
          onMark={onMarkHandler}
          onCompleteCard={onCompleteCardHandler}
        />
      )}
    </>
  );
};

export default ViewPage;
