import { useQuery } from "react-query";
import { myInfoApi } from "../../api/user";

export default (options) =>
  useQuery("myInfo", myInfoApi, { refetchOnMount: "always", ...options });
