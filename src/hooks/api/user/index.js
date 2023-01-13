import useAxios from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/user`;

export const usersApi = ({ queryKey }) => {
  const [_, { name }] = queryKey;
  const params = new URLSearchParams({ name });
  return useAxios({
    method: "GET",
    url: `${baseUrl}`,
    params,
  });
};

export const createUserApi = (data) => {
  return useAxios({
    method: "POST",
    url: `${baseUrl}`,
    data
  });
};

export const myInfoApi = () => {
  return useAxios({
    method: "GET",
    url: `${baseUrl}/one`,
  });
};

export const updateMyInfoApi = ({ data }) => {
  return useAxios({
    method: "PATCH",
    url: `${baseUrl}/one`,
    data
  });
};

export const userApi = ({ queryKey }) => {
  const [_, userIdx] = queryKey;
  return useAxios({
    method: "GET",
    url: `${baseUrl}/one/${userIdx}`,
  });
};

export const updateUserInfoApi = ({ userIdx, data }) => {
  return useAxios({
    method: "PATCH",
    url: `${baseUrl}/one/${userIdx}`,
    data
  });
};
