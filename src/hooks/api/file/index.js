import { useAxios } from "../useAxios";

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