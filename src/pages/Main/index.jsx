import React, { useCallback } from "react";
import MainLayout from "../../components/templates/MainLayout";
import { useQueryClient } from "react-query";
import useUserInfoQuery from "../../hooks/query/user/useUserInfoQuery";
import useAccessMutation from "../../hooks/query/auth/useAccessMutation";

const MainPage = () => {
  const { status: userStatus, data: user } = useUserInfoQuery(null);
  const queryClient = useQueryClient();
  const accessMutation = useAccessMutation();
  const onChangeAccessHandler = useCallback(
    (access) => {
      accessMutation.mutate(access, {
        onSuccess: () => {
          queryClient.invalidateQueries(["user/one", null]);
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
