import { useAxios } from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/assign`;

export const myCardApi = () => {
  return useAxios({
    method: "GET",
    url: `${baseUrl}/card/me`,
  });
};

export const assignedCardApi = ({ queryKey }) => {
  const [_, cardAssignedIdx] = queryKey;
  return useAxios({
    method: "GET",
    url: `${baseUrl}/card/${cardAssignedIdx}`,
  });
};
