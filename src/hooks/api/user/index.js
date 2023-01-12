import useAxios from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/user`;

export const myInfoApi = () => {
  return useAxios({
    method: "GET",
    url: `${baseUrl}/one`,
  });
};

export const userApi = ({ queryKey }) => {
  const [_, userIdx] = queryKey;
  return useAxios({
    method: "GET",
    url: `${baseUrl}/one/${userIdx}`,
  });
};

export const usersApi = ({ queryKey }) => {
  const [_, { name }] = queryKey;
  const params = new URLSearchParams({ name });
  return useAxios({
    method: "GET",
    url: `${baseUrl}`,
    params,
  });
};
