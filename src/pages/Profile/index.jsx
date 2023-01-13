import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import { myInfoApi, userApi } from "../../hooks/api/user";
import useUploadProfileImageMutation from "../../hooks/query/file/useUploadProfileImageMutation";
import useDeleteProfileImageMutation from "../../hooks/query/file/useDeleteProfileImageMutation";
import ProfileLayout from "../../components/templates/ProfileLayout";

const ProfilePage = () => {
  const { userIdx } = useParams();
  const queryClient = useQueryClient();
  const results = useQueries({
    queries: [
      {
        queryKey: [`user/${userIdx}`, userIdx],
        queryFn: userApi,
        enabled: !!userIdx,
        refetchOnMount: "always",
      },
      {
        queryKey: ["myInfo"],
        queryFn: myInfoApi,
        refetchInterval: 2000,
      },
    ],
  });
  const { mutate: uploadProfileImageMutate } = useUploadProfileImageMutation();
  const { mutate: deleteProfileImageMutate } = useDeleteProfileImageMutation();
  const { data: userData } = results[0];
  const { data: myInfoData } = results[1];
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
  const profileSplit = user.profile ? user.profile.split("/") : [];
  const filename = profileSplit[profileSplit.length - 1];
  const onUploadProfileHandler = useCallback(
    (imageFile) => {
      return new Promise((resolve) => {
        if (filename) {
          deleteProfileImageMutate(
            { filename },
            {
              onSuccess: () => {
                uploadProfileImageMutate(
                  { image: imageFile },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries(["myInfo"]);
                      resolve();
                    },
                  }
                );
              },
              onError: () => resolve,
            }
          );
        } else {
          uploadProfileImageMutate(
            { image: imageFile },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(["myInfo"]);
                resolve(true);
              },
              onError: () => resolve,
            }
          );
        }
      });
    },
    [uploadProfileImageMutate, queryClient, filename]
  );
  return (
    <ProfileLayout
      userData={user}
      isMyProfile={!userIdx}
      hasAuth={!!myInfo.auth}
      onUploadProfile={onUploadProfileHandler}
    />
  );
};

export default ProfilePage;
