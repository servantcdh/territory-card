import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignUserApi } from "../../api/assign";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(assignUserApi, {
    onMutate: () => {
      queryClient.cancelQueries(["assignedCrews"]);
    },
  });
};
