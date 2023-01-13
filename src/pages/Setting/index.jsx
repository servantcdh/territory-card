import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import { userApi } from "../../hooks/api/user";
import useUpdateMyInfoMutation from "../../hooks/query/user/useUpdateMyInfoMutation";
import useUpdateUserMutation from "../../hooks/query/user/useUpdateUserMutation";
import SettingLayout from "../../components/templates/SettingLayout";

const SettingPage = () => {
  const { userIdx } = useParams();
  const queryClient = useQueryClient();
  const myInfoData = queryClient.getQueryData(["myInfo"]);
  const results = useQueries({
    queries: [
      {
        queryKey: [`user/${userIdx}`, userIdx],
        queryFn: userApi,
        enabled: !!userIdx,
        refetchOnMount: "always",
      },
    ],
  });
  const { mutate: updateMyInfoMutate } = useUpdateMyInfoMutation();
  const { mutate: updateUserMutate } = useUpdateUserMutation();
  const { data: userData } = results[0];
  const empty = {
    auth: 0,
    baptize: 0,
    car: 0,
    driver: 0,
    gender: 0,
    guide: 0,
    live: 0,
    name: "",
    profile: "",
    status: 0,
    userIdx: 0,
  };
  const myInfo = myInfoData ? myInfoData : empty;
  const user = userIdx ? (userData ? userData : empty) : myInfo;
  const { auth } = myInfo;
  const onUpdateInfoHandler = useCallback(
    (data) => {
      return new Promise((resolve, reject) => {
        if (userIdx) {
          updateUserMutate(
            { userIdx, data },
            {
              onSuccess: () => {
                queryClient.invalidateQueries([["user"], ["users"]]);
                resolve();
              },
              onError: (error) => reject(error),
            }
          );
        } else {
          updateMyInfoMutate(
            { data },
            {
              onSuccess: () => {
                queryClient.invalidateQueries([["myInfo"], ["users"]]);
                resolve();
              },
              onError: (error) => reject(error),
            }
          );
        }
      });
    },
    [updateMyInfoMutate, updateUserMutate, userIdx, queryClient]
  );
  return (
    <SettingLayout
      userData={user}
      onUpdate={onUpdateInfoHandler}
      hasAuth={!!auth}
      isMyInfo={!userIdx}
    />
  );
};

export default SettingPage;
