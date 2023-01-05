export const setAccessToken = (accessToken) => {
  return new Promise((resolve) => {
    accessToken
      ? localStorage.setItem("a", accessToken)
      : localStorage.removeItem("a");
    resolve(true);
  });
};

export const getAccessToken = () => {
  return localStorage.getItem("a");
};
