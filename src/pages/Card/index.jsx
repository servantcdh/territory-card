import React, { useCallback, useRef, useState } from "react";
import CardLayout from "../../components/templates/CardLayout";
import useRollbackCardMutation from "../../hooks/query/card/useRollbackCardMutation";
import useAssignCardsMutation from "../../hooks/query/assign/useAssignCardsMutation";
import useAssignCrewsMutation from "../../hooks/query/assign/useAssignCrewsMutation";
import useAssignUserMutation from "../../hooks/query/assign/useAssignUserMutation";
import useCompleteCardMutation from "../../hooks/query/assign/useCompleteCardMutation";
import useUploadExcelCardMutation from "../../hooks/query/file/useUploadExcelCardMutation";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import { tagsApi, cardsApi } from "../../hooks/api/card";
import { assignedCardsApi } from "../../hooks/api/assign";
import { usersApi } from "../../hooks/api/user";

const CardPage = () => {
  const [tags, setTags] = useState([]);
  const [tagsIgnored, setTagsIgnored] = useState([]);
  const [searchName, setSearchName] = useState("");
  const { mutate: rollbackCardMutate } = useRollbackCardMutation();
  const { mutate: assignCardsMutate } = useAssignCardsMutation();
  const { mutate: assignCrewsMutate } = useAssignCrewsMutation();
  const { mutate: assignUserMutate } = useAssignUserMutation();
  const { mutate: completeCardMutate } = useCompleteCardMutation();
  const { mutate: uploadExcelCardMutate } = useUploadExcelCardMutation();
  const queryClient = useQueryClient();
  const results = useQueries({
    queries: [
      {
        queryKey: ["tags", { orderBy: "count", desc: 1 }],
        queryFn: tagsApi,
        refetchInterval: 2000,
      },
      {
        queryKey: ["cards", { tags, tagsIgnored }],
        queryFn: cardsApi,
        refetchInterval: 2000,
      },
      {
        queryKey: ["assignedCards"],
        queryFn: assignedCardsApi,
        refetchInterval: 2000,
      },
      {
        queryKey: ["users", { name: searchName }],
        queryFn: usersApi,
        refetchInterval: 2000,
      },
    ],
  });
  const { data: tagsData } = results[0];
  const { data: cardsData } = results[1];
  const { data: assignedCardsData } = results[2];
  const { data: usersData } = results[3];
  const assignedIdxes = (assignedCardsData ? assignedCardsData : []).map(
    (card) => card.cardIdx
  );
  const filteredCards = (cardsData ? cardsData : []).filter(
    (card) => !assignedIdxes.includes(card.idx)
  );
  const scrollRef = useRef();
  const onTagChangeHandler = useCallback(
    (tags, tagsIgnored, setCheckeds) => {
      setTags(tags);
      setTagsIgnored(tagsIgnored);
      setCheckeds([]);
    },
    [setTags, setTagsIgnored]
  );
  const onRollbackCardHandler = useCallback(
    (cardIdx, cardBackupIdx) => {
      rollbackCardMutate(
        { cardIdx, cardBackupIdx },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([["card"], ["cards"]]);
          },
        }
      );
    },
    [rollbackCardMutate, queryClient]
  );
  const onAssignCardsHandler = useCallback(
    (cardIdxes) => {
      assignCardsMutate(
        { cardIdxes },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["cards"]);
            scrollRef.current.scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "nearest",
            });
          },
        }
      );
    },
    [queryClient, assignCardsMutate]
  );
  const onAssignCrewsHandler = useCallback(
    (cardAssignedIdx, { userIdx, userIdxes }) => {
      assignCrewsMutate(
        { cardAssignedIdx, userIdxes },
        {
          onSuccess: () => {
            if (userIdx) {
              assignUserMutate(
                { cardAssignedIdx, data: { userIdx } },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries(["assignedCards"]);
                  },
                }
              );
            } else {
              queryClient.invalidateQueries(["assignedCards"]);
            }
          },
        }
      );
    },
    [queryClient, assignCrewsMutate, assignUserMutate]
  );
  const onCompletekCardHandler = useCallback(
    (cardAssignedIdx) => {
      completeCardMutate(
        { cardAssignedIdx },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([["cards"], ["assignedCards"]]);
          },
        }
      );
    },
    [completeCardMutate, queryClient]
  );
  const onSearchUserHandler = useCallback(
    (name) => {
      setSearchName(name);
      queryClient.invalidateQueries(["users"]);
    },
    [queryClient]
  );
  const onUploadCardHandler = useCallback(
    (cardFile, setCardFile) => {
      uploadExcelCardMutate(
        { cardFile },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["cards"]);
            setCardFile(null);
          },
        }
      );
    },
    [queryClient, uploadExcelCardMutate]
  );
  return (
    <CardLayout
      tagsData={tagsData}
      cardsData={filteredCards}
      assignedCardsData={assignedCardsData}
      usersData={usersData}
      onTagChange={onTagChangeHandler}
      onRollbackCard={onRollbackCardHandler}
      onAssignCards={onAssignCardsHandler}
      onAssignCrews={onAssignCrewsHandler}
      onSearchUser={onSearchUserHandler}
      onUploadCard={onUploadCardHandler}
      onRetrieve={onCompletekCardHandler}
      scrollRef={scrollRef}
    />
  );
};

export default CardPage;
