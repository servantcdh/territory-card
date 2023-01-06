import React, { useCallback } from "react";
import MainLayout from "../../components/templates/MainLayout";
import { useQueryClient } from "react-query";
import useAccessMutation from "../../hooks/query/auth/useAccessMutation";
import useMyInfoQuery from "../../hooks/query/user/useMyInfoQuery";

const MainPage = () => {
  const { status: userStatus, data: user } = useMyInfoQuery();
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
    [accessMutation, queryClient, user]
  );
  return (
    <MainLayout
      userStatus={userStatus}
      user={user}
      onChangeAccess={onChangeAccessHandler}
    />
  );
};

export default MainPage;
