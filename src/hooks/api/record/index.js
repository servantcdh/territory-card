import { useAxios } from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/record`;

export const recordCardApi = (params) => {
  const { cardAssignedIdx, cardContentIdx, ...data } = params;
  return useAxios({
    method: "POST",
    url: `${baseUrl}/${cardAssignedIdx}/${cardContentIdx}`,
    data,
  });
};
