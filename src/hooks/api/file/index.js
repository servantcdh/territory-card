import useAxios from "../useAxios";

const baseUrl = `${apiHost ? "" : "/api"}/file`;

export const excelFormApi = async () => {
  const blob = await useAxios({
    method: "GET",
    url: `${baseUrl}/form`,
    responseType: "blob",
  });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute("download", "구역카드기본양식.xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

export const excelCardApi = async (cardIdx, cardName) => {
  const blob = await useAxios({
    method: "GET",
    url: `${baseUrl}/card/${cardIdx}`,
    responseType: "blob",
  });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute("download", `구역${cardIdx}-${cardName}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

export const uploadExcelCardApi = ({ cardFile }) => {
  const data = new FormData();
  data.append("excel", cardFile);
  return useAxios({
    method: "POST",
    url: `${baseUrl}/card`,
    data,
    Headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadProfileApi = ({ image }) => {
  const data = new FormData();
  data.append("profile", image);
  return useAxios({
    method: "POST",
    url: `${baseUrl}/profile`,
    data,
    Headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProfileApi = ({ filename }) => {
  return useAxios({
    method: "DELETE",
    url: `${baseUrl}/profile/${filename}`,
  });
};

export const docxS13Api = async (serviceYear) => {
  const blob = await useAxios({
    method: "GET",
    url: `${baseUrl}/s-13/${serviceYear}`,
    responseType: "blob",
  });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute("download", `구역배정기록-${serviceYear}년도.docx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};