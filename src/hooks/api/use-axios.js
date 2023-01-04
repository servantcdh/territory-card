import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

export const useAxios = async (config) => {
  try {
    const response = await axios(config);
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
