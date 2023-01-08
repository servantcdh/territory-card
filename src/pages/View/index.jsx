import React, { Suspense, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import { ErrorBoundary } from "../../error";
import ViewLayout from "../../components/templates/ViewLayout";
import useCardMutation from "../../hooks/query/card/useCardMutation";
import useRecordCardMutation from "../../hooks/query/record/useRecordCardMutation";
import Body from "../../components/atoms/Body";
import { cardApi } from "../../hooks/api/card";
import { assignedCardApi } from "../../hooks/api/assign";

const ViewPage = () => {
  const { cardIdx, cardAssignedIdx } = useParams();
  const navigate = useNavigate();
  const results = useQueries({
    queries: [
      {
        queryKey: [`card/${cardIdx}`, cardIdx],
        queryFn: cardApi,
        refetchInterval: 2000,
        suspense: true,
      },
      {
        queryKey: [`assignedCard/${cardAssignedIdx}`, cardAssignedIdx],
        queryFn: assignedCardApi,
        refetchInterval: 2000,
        suspense: true,
      },
    ],
  });
  const { data: cardData } = results[0];
  const { data: assignedData } = results[1];
  const { mutate: cardMutate } = useCardMutation();
  const { mutate: recordMutate } = useRecordCardMutation();
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
    if (assignedData && assignedData.dataCompleted) {
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
  return (
    <Suspense
      fallback={<Body className="animate-naviToView p-1">불러오는 중</Body>}
    >
      <ErrorBoundary fallback={<div>에러 발생</div>}>
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
          />
        )}
      </ErrorBoundary>
    </Suspense>
  );
};

export default ViewPage;
