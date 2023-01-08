import React, { useCallback } from "react";
import MainLayout from "../../components/templates/MainLayout";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import { myInfoApi } from "../../hooks/api/user";
import { myCardApi } from "../../hooks/api/assign";
import useAccessMutation from "../../hooks/query/auth/useAccessMutation";

const MainPage = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["myInfo"],
        queryFn: myInfoApi,
        refetchOnMount: "always",
      },
      {
        queryKey: ["myCard"],
        queryFn: myCardApi,
        refetchInterval: 2000,
      },
    ],
  });
  const { data: myInfo } = results[0];
  const { data: myCard } = results[1];
  const queryClient = useQueryClient();
  const accessMutation = useAccessMutation();
  const onChangeAccessHandler = useCallback(
    (access) => {
      accessMutation.mutate(access, {
        onSuccess: () => {
          queryClient.invalidateQueries(["myInfo"]);
        },
      });
    },
    [accessMutation, queryClient]
  );
  return (
    <MainLayout
      myInfo={myInfo}
      myCard={myCard}
      onChangeAccess={onChangeAccessHandler}
    />
  );
};

export default MainPage;
