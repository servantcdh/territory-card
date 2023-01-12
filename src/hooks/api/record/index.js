import useAxios from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/record`;

export const recordCardApi = (params) => {
  const { cardAssignedIdx, cardContentIdx, ...data } = params;
  return useAxios({
    method: "POST",
    url: `${baseUrl}/${cardAssignedIdx}/${cardContentIdx}`,
    data,
  });
};

export const s13Api = ({ queryKey }) => {
  const [_, serviceYear] = queryKey;
  return useAxios({
    method: "GET",
    url: `${baseUrl}/s-13/${serviceYear}`,
  });
};
