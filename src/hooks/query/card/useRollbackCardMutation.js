import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rollbackCardApi } from "../../api/card";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(rollbackCardApi, {
    onMutate: ({ cardIdx }) => {
      queryClient.cancelQueries([[`card/${cardIdx}`, cardIdx], ["cards"]]);
    },
  });
};
