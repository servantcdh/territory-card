import React, { Suspense, useCallback } from "react";
import MainLayout from "../../components/templates/MainLayout";
import { useQueryClient } from "react-query";
import { ErrorBoundary } from "../../error";
import useAccessMutation from "../../hooks/query/auth/useAccessMutation";
import useMyInfoQuery from "../../hooks/query/user/useMyInfoQuery";
import useMyCardQuery from "../../hooks/query/assign/useMyCardQuery";
import Body from "../../components/atoms/Body";

const MainPage = () => {
  const { data: myInfo } = useMyInfoQuery();
  const { data: myCard } = useMyCardQuery();
  const queryClient = useQueryClient();
  const accessMutation = useAccessMutation();
  const onChangeAccessHandler = useCallback(
    (access) => {
      accessMutation.mutate(access, {
        onSuccess: () => {
          queryClient.invalidateQueries("myInfo");
        },
      });
    },
    [accessMutation, queryClient]
  );
  return (
    <Suspense
      fallback={<Body>불러오는 중</Body>}
    >
      <ErrorBoundary fallback={<div>에러 발생</div>}>
        <MainLayout
          myInfo={myInfo}
          myCard={myCard}
          onChangeAccess={onChangeAccessHandler}
        />
      </ErrorBoundary>
    </Suspense>
  );
};

export default MainPage;
