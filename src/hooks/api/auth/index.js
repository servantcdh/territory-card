import { useAxios } from "../use-axios";

const baseUrl = `${apiHost}/auth`;

export const loginApi = (data) => {
  return useAxios({
    method: "POST",
    url: `${baseUrl}/login`,
    data,
  });
};
