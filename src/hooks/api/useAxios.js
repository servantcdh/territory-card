import axios from "axios";
import { getAccessToken } from "../storage";

if (apiHost) {
  axios.defaults.baseURL = apiHost;
}

axios.defaults.headers.common["Content-Type"] = "application/json";

const useAxios = async (config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export default useAxios;
