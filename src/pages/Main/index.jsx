import React, { useCallback } from "react";
import MainLayout from "../../components/templates/MainLayout";
import { useQueryClient } from "react-query";
import useAccessMutation from "../../hooks/query/auth/useAccessMutation";
import useMyInfoQuery from "../../hooks/query/user/useMyInfoQuery";
import useMyCardQuery from "../../hooks/query/assign/useMyCardQuery";

const MainPage = () => {
  const { status: myInfoStatus, data: myInfo } = useMyInfoQuery();
  const { status: myCardStatus, data: myCard } = useMyCardQuery();
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
    <MainLayout
      myInfoStatus={myInfoStatus}
      myInfo={myInfo}
      onChangeAccess={onChangeAccessHandler}
      myCardStatus={myCardStatus}
      myCard={myCard}
    />
  );
};

export default MainPage;
