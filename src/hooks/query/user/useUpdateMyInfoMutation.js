import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyInfoApi } from "../../api/user";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(updateMyInfoApi, {
    onMutate: () => {
      queryClient.cancelQueries([["myInfo"], ["users"]]);
    },
  });
};
