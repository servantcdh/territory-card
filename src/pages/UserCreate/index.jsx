import React, { useCallback } from "react";
import useCreateUserMutation from "../../hooks/query/user/useCreateUserMutation";
import SettingLayout from "../../components/templates/SettingLayout";
import { useQueryClient } from "@tanstack/react-query";

const UserCreatePage = () => {
  const queryClient = useQueryClient();
  const { mutate: createUserMutate } = useCreateUserMutation();
  const onCreateUserHandler = useCallback(
    (data) => {
      return new Promise((resolve, reject) => {
        createUserMutate(
          { data },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(["users"]);
              resolve();
            },
            onError: (error) => reject(error),
          }
        );
      });
    },
    [createUserMutate, queryClient]
  );
  return <SettingLayout onCreate={onCreateUserHandler} hasAuth={true} />;
};

export default UserCreatePage;
