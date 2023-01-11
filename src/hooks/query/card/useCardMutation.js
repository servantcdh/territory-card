import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCardApi } from "../../api/card";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(updateCardApi, {
    onMutate: ({ idx }) => {
      queryClient.cancelQueries([`card/${idx}`, idx]);
    },
  });
};
