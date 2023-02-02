import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlanUserApi } from "../../api/cart";

export default () => {
    const queryClient = useQueryClient();
    return useMutation(createPlanUserApi, {
      onMutate: ({ cartDayTimeIdx }) => {
        queryClient.cancelQueries([`planApi/${cartDayTimeIdx}`, cartDayTimeIdx]);
      },
    });
}
