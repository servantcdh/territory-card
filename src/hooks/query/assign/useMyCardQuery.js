import { useQuery } from "react-query";
import { myCardApi } from "../../api/assign";

export default (options) =>
  useQuery("myCard", myCardApi, { refetchInterval: 2000, ...options });
