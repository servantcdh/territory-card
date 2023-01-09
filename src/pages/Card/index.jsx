import React, { useCallback, useState } from "react";
import CardLayout from "../../components/templates/CardLayout";
import { useQueries } from "@tanstack/react-query";
import { cardsApi, tagsApi } from "../../hooks/api/card";

const CardPage = () => {
  const [tags, setTags] = useState([]);
  const [tagsIgnored, setTagsIgnored] = useState([]);
  const results = useQueries({
    queries: [
      {
        queryKey: ["cards", { tags, tagsIgnored }],
        queryFn: cardsApi,
        refetchInterval: 2000,
      },
      {
        queryKey: ["tags", { orderBy: "count" }],
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
  return (
    <CardLayout
      cardsData={cardsData}
      tagsData={tagsData}
      onTagChange={onTagChangeHandler}
    />
  );
};

export default CardPage;
