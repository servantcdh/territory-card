import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadExcelCardApi } from "../../api/file";

export default () => {
  const queryClient = useQueryClient();
  return useMutation(uploadExcelCardApi, {
    onMutate: () => {
      queryClient.cancelQueries(["cards"]);
    },
  });
};
