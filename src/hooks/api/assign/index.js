import useAxios from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/assign`;

export const myCardApi = () => {
  return useAxios({
    method: "GET",
    url: `${baseUrl}/card/me`,
  });
};

export const assignedCardsApi = () => {
  return useAxios({
    method: "GET",
    url: `${baseUrl}/card`,
  });
};

export const assignCardsApi = (data) => {
  return useAxios({
    method: "POST",
    url: `${baseUrl}/card`,
    data,
  });
};

export const assignCrewsApi = (data) => {
  return useAxios({
    method: "POST",
    url: `${baseUrl}/crew`,
    data,
  });
};

export const assignedCardApi = ({ queryKey }) => {
  const [_, cardAssignedIdx] = queryKey;
  return useAxios({
    method: "GET",
    url: `${baseUrl}/card/${cardAssignedIdx}`,
  });
};

export const completeCardApi = ({ cardAssignedIdx }) => {
  return useAxios({
    method: "PATCH",
    url: `${baseUrl}/card/me/${cardAssignedIdx}`,
  });
};
