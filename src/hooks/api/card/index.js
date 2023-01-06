import { useAxios } from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/card`;

export const cardApi = ({ queryKey }) => {
  const [_, cardIdx] = queryKey;
  return useAxios({
    method: "GET",
    url: `${baseUrl}/one/${cardIdx}`,
  });
};

export const updateCardApi = (data) => {
  const { idx } = data;
  return useAxios({
    method: "PATCH",
    url: `${baseUrl}/one/${idx}`,
    data,
  });
};
