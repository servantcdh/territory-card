import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProfileApi } from "../../api/file";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(uploadProfileApi, {
    onMutate: () => {
      queryClient.cancelQueries(["myInfo"]);
    },
  });
};
