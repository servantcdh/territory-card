import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeCardApi } from "../../api/assign";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(completeCardApi, {
    onMutate: () => {
      queryClient.cancelQueries([["cards"], ["assignedCards"]]);
    },
  });
};
