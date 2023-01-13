import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfoApi } from "../../api/user";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserInfoApi, {
    onMutate: () => {
      queryClient.cancelQueries([["user"], ["users"]]);
    },
  });
};
