import { useAxios } from "../use-axios";

const baseUrl = `/api/user`;

export const myInfoApi = () => {
  return useAxios({
    method: "GET",
    url: `${baseUrl}/one`,
  });
};
