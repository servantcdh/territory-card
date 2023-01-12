import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfileApi } from "../../api/file";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProfileApi, {
    onMutate: () => {
      queryClient.cancelQueries(["myInfo"]);
    },
  });
};
