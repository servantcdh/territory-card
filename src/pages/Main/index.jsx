import React, { useCallback } from "react";
import MainLayout from "../../components/templates/MainLayout";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import { myInfoApi } from "../../hooks/api/user";
import { myCardApi } from "../../hooks/api/assign";
import { weekApi } from "../../hooks/api/cart";
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
        refetchInterval: 1000,
      },
      {
        queryKey: ["week"],
        queryFn: weekApi,
        refetchInterval: 1000,
      },
    ],
  });
  const { data: myInfo } = results[0];
  const { data: myCard } = results[1];
  const { data: week } = results[2];
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
  const weekData = week ? week : [];
  const todayCode = new Date().getDay();
  const firstPart = weekData.filter((day) => day.dayCode >= todayCode);
  const lastPart = weekData.filter((day) => day.dayCode < todayCode);
  const weekSorted = firstPart.concat(lastPart);
  return (
    <MainLayout
      myInfo={myInfo}
      myCard={myCard}
      week={weekSorted}
      onChangeAccess={onChangeAccessHandler}
    />
  );
};

export default MainPage;
