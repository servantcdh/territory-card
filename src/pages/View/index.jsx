import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import { cardApi } from "../../hooks/api/card";
import { assignedCardApi } from "../../hooks/api/assign";
import ViewLayout from "../../components/templates/ViewLayout";
import useCardMutation from "../../hooks/query/card/useCardMutation";
import useRecordCardMutation from "../../hooks/query/record/useRecordCardMutation";
import useCompleteCardMutation from "../../hooks/query/assign/useCompleteCardMutation";
import Modal from "../../components/molecules/Modal";

const ViewPage = () => {
  const { cardIdx, cardAssignedIdx } = useParams();
  const [activeModal, setActiveModal] = useState(false);
  const navigate = useNavigate();
  const results = useQueries({
    queries: [
      {
        queryKey: [`card/${cardIdx}`, cardIdx],
        queryFn: cardApi,
        refetchInterval: 1000,
      },
      {
        queryKey: [`assignedCard/${cardAssignedIdx}`, cardAssignedIdx],
        queryFn: assignedCardApi,
        enabled: !!cardAssignedIdx,
        refetchInterval: 1000,
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
  const { userIdx, ...authInfo } = user
    ? user
    : { userIdx: 0, auth: 0, guide: 0 };
  const users = [];
  const { street: address } = cardData
    ? cardData.cardContent[0]
    : { street: "" };
  let hasUsed = false;
  if (assignedData) {
    assignedData.crewAssigned.forEach((crew) => {
      const user = crew.user;
      const access = user ? user.access : null;
      const { live } = access ? access : { live: false };
      users.push({ ...user, live });
    });
    hasUsed =
      assignedData.cardRecord.findIndex((record) => record.cardMarkIdx === 1) >
      -1;
  }
  useEffect(() => {
    const { auto, guide } = authInfo;
    if (assignedData && assignedData.dateCompleted) {
      if (!auto && !guide) {
        setActiveModal(true);
      }
    }
  }, [assignedData, navigate, authInfo, setActiveModal]);
  const onConfirmModalHandler = useCallback(() => {
    setActiveModal(false);
    navigate("/");
  }, [setActiveModal, navigate]);
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
  const onMarkHandler = useCallback(
    (cardContentIdx, cardMarkIdx) => {
      if (cardAssignedIdx) {
        recordMutate(
          {
            cardAssignedIdx,
            cardContentIdx,
            cardMarkIdx,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries([
                [`card/${cardIdx}`, cardIdx],
                [`assignedCard/${cardAssignedIdx}`, cardAssignedIdx],
              ]);
            },
          }
        );
      }
    },
    [recordMutate, cardAssignedIdx]
  );
  const onCompleteCardHandler = useCallback(() => {
    completeCardMutate(
      { cardAssignedIdx },
      {
        onSuccess: () => setActiveModal(true),
        onError: (err) => {
          if (err.message.includes("완료")) {
            navigate("/");
          }
        },
      }
    );
  }, [completeCardMutate, setActiveModal, navigate]);
  return (
    <>
      {activeModal && (
        <Modal
          className="bg-amber-200"
          title={`카드가 ${hasUsed ? "반납" : "회수"}되었습니다.`}
          onConfirm={onConfirmModalHandler}
          buttonName="닫기"
        >
          수고하셨습니다!
        </Modal>
      )}
      {cardData && (
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
