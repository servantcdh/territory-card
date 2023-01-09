import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeCardApi } from "../../api/assign";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(completeCardApi, {
    onMutate: async ({ cardAssignedIdx }) => {
      queryClient.cancelQueries([
        `assignedCard/${cardAssignedIdx}`,
        cardAssignedIdx,
      ]);
    },
  });
};
