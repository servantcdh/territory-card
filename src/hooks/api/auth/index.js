import useAxios from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/auth`;

export const loginApi = (data) => {
  return useAxios({
    method: "POST",
    url: `${baseUrl}/login`,
    data,
  });
};

export const refreshTokenApi = () => {
  return useAxios({
    method: "POST",
    url: `${baseUrl}/refreshToken`,
  });
};

export const accessApi = (data) => {
  return useAxios({
    method: "PATCH",
    url: `${baseUrl}/access`,
    data,
  });
};

export const logoutApi = () => {
  return useAxios({
    method: "PATCH",
    url: `${baseUrl}/logout`,
  });
};
