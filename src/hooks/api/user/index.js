import { useAxios } from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/user`;

export const userInfoApi = ({ queryKey }) => {
  const userIdx = queryKey[2];
  return useAxios({
    method: "GET",
    url: `${baseUrl}/one${userIdx ? `/${userIdx}` : ""}`,
  });
};
