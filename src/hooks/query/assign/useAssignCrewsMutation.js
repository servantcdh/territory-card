import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignCrewsApi } from "../../api/assign";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(assignCrewsApi, {
    onMutate: () => {
      queryClient.cancelQueries(["assignedCards"]);
    },
  });
};
