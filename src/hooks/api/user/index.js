import { useAxios } from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/user`;

export const myInfoApi = () => {
  return useAxios({
    method: "GET",
    url: `${baseUrl}/one`,
  });
};
