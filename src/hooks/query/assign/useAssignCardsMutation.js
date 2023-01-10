import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignCardsApi } from "../../api/assign";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(assignCardsApi, {
    onMutate: async () => {
      queryClient.cancelQueries(["cards"]);
    },
  });
};
