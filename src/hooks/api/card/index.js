import useAxios from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/card`;

export const cardApi = ({ queryKey }) => {
  const [_, cardIdx] = queryKey;
  return useAxios({
    method: "GET",
    url: `${baseUrl}/one/${cardIdx}`,
  });
};

export const cardsApi = ({ queryKey }) => {
  const [_, data] = queryKey;
  const { tags, tagsIgnored } = data;
  const params = new URLSearchParams({
    tags: tags.join(","),
    tagsIgnored: tagsIgnored.join(","),
  });
  return useAxios({
    method: "GET",
    url: `${baseUrl}`,
    params,
  });
};

export const updateCardApi = (data) => {
  const { idx } = data;
  return useAxios({
    method: "PATCH",
    url: `${baseUrl}/one/${idx}`,
    data,
  });
};

export const rollbackCardApi = (data) => {
  const { cardIdx, cardBackupIdx } = data;
  return useAxios({
    method: "PATCH",
    url: `${baseUrl}/one/${cardIdx}/${cardBackupIdx}`,
  });
};

export const tagsApi = ({ queryKey }) => {
  const [_, data] = queryKey;
  const params = new URLSearchParams(data);
  return useAxios({
    method: "GET",
    url: `${baseUrl}/tag`,
    params,
  });
};
