import React, { useCallback } from "react";
import MainLayout from "../../components/templates/MainLayout";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { myInfoApi } from "../../hooks/api/user";
import { accessApi } from "../../hooks/api/auth";

const MainPage = () => {
  const { status: userStatus, data: user } = useQuery("user/one", myInfoApi, {
    refetchOnMount: "always",
  });
  const queryClient = useQueryClient();
  const accessMutation = useMutation(accessApi);
  const onChangeAccessHandler = useCallback(
    (access) => {
      accessMutation.mutate(access, {
        onSuccess: () => {
          queryClient.invalidateQueries("user/one");
        },
      });
    },
    [user]
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
