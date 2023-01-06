import { useAxios } from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/assign`;

export const myCardApi = () => {
  return useAxios({
    method: "GET",
    url: `${baseUrl}/card/me`,
  });
};
