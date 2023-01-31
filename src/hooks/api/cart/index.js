import useAxios from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/cart`;

export const weekApi = () => {
  return useAxios({
    method: "GET",
    url: `${baseUrl}`,
  });
};

export const dayApi = ({ queryKey }) => {
  const [_, dayCode] = queryKey;
  return useAxios({
    method: "GET",
    url: `${baseUrl}/${dayCode}`,
  });
};

export const planApi = ({ queryKey }) => {
  const [_, cartDayTimeIdx] = queryKey;
  return useAxios({
    method: "GET",
    url: `${baseUrl}/plan/${cartDayTimeIdx}`,
  });
};

export const createPlanApi = (data) => {
  return useAxios({
    method: "POST",
    url: `${baseUrl}/plan`,
    data,
  });
};

export const updatePlanApi = (data) => {
  return useAxios({
    method: "PATCH",
    url: `${baseUrl}/plan`,
    data,
  });
};

export const deletePlanApi = ({ cartDayTimeIdx }) => {
  return useAxios({
    method: "DELETE",
    url: `${baseUrl}/plan/${cartDayTimeIdx}`,
  });
};

export const createPlanLocationApi = (data) => {
  return useAxios({
    method: "POST",
    url: `${baseUrl}/plan/location`,
    data,
  });
};

export const deletePlanLocationApi = ({ cartDayTimeLocationIdx }) => {
  return useAxios({
    method: "DELETE",
    url: `${baseUrl}/plan/location/${cartDayTimeLocationIdx}`,
  });
};

export const createPlanUserApi = (data) => {
  return useAxios({
    method: "POST",
    url: `${baseUrl}/plan/user`,
    data,
  });
};

export const deletePlanUserApi = ({ cartDayTimeUserIdx }) => {
  return useAxios({
    method: "DELETE",
    url: `${baseUrl}/plan/user/${cartDayTimeUserIdx}`,
  });
};

export const assignCartCrewsApi = (data) => {
  return useAxios({
    method: "POST",
    url: `${baseUrl}/plan/assign`,
    data,
  });
};

export const resetPlanUsersApi = ({ cartDayTimeIdx }) => {
  return useAxios({
    method: "DELETE",
    url: `${baseUrl}/plan/reset/${cartDayTimeIdx}`,
  });
};

export const locationsApi = () => {
  return useAxios({
    method: "GET",
    url: `${baseUrl}/location`,
  });
};

export const locationApi = ({ queryKey }) => {
  const [_, cartLocationIdx] = queryKey;
  return useAxios({
    method: "GET",
    url: `${baseUrl}/location/${cartLocationIdx}`,
  });
};

export const createLocationApi = (data) => {
  return useAxios({
    method: "POST",
    url: `${baseUrl}/location`,
    data,
  });
};

export const updateLocationApi = (data) => {
  return useAxios({
    method: "PATCH",
    url: `${baseUrl}/location`,
    data,
  });
};

export const deleteLocationApi = ({ queryKey }) => {
  const [_, cartLocationIdx] = queryKey;
  return useAxios({
    method: "DELETE",
    url: `${baseUrl}/location/${cartLocationIdx}`,
  });
};
