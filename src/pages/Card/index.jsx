import React, { useCallback, useState } from "react";
import CardLayout from "../../components/templates/CardLayout";
import useRollbackCardMutation from "../../hooks/query/card/useRollbackCardMutation";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import { cardsApi, tagsApi } from "../../hooks/api/card";

const CardPage = () => {
  const [tags, setTags] = useState([]);
  const [tagsIgnored, setTagsIgnored] = useState([]);
  const { mutate: rollbackCardMutate } = useRollbackCardMutation();
  const queryClient = useQueryClient();
  const results = useQueries({
    queries: [
      {
        queryKey: ["cards", { tags, tagsIgnored }],
        queryFn: cardsApi,
        refetchInterval: 2000,
      },
      {
        queryKey: ["tags", { orderBy: "count", desc: 1 }],
        queryFn: tagsApi,
        refetchInterval: 2000,
      },
    ],
  });
  const { data: cardsData } = results[0];
  const { data: tagsData } = results[1];
  const onTagChangeHandler = useCallback(
    (tags, tagsIgnored) => {
      setTags(tags);
      setTagsIgnored(tagsIgnored);
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
      console.log(cardIdxes);
    },
    [queryClient]
  );
  return (
    <CardLayout
      cardsData={cardsData}
      tagsData={tagsData}
      onTagChange={onTagChangeHandler}
      onRollbackCard={onRollbackCardHandler}
      onAssignClick={onAssignCardsHandler}
    />
  );
};

export default CardPage;
