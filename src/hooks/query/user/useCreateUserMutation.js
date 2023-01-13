import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserApi } from "../../api/user";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(createUserApi, {
    onMutate: () => {
      queryClient.cancelQueries(["users"]);
    },
  });
};
