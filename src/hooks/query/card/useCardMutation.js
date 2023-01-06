import { useMutation, useQueryClient } from "react-query";
import { updateCardApi } from "../../api/card";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(updateCardApi, {
    onMutate: async (data) => {
        const { idx } = data;
        queryClient.cancelQueries([`card/${idx}`, idx]);
    },
  });
};
