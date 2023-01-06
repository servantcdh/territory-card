import { useQuery } from "react-query";
import { userInfoApi } from "../../api/user";

export default (userIdx, options) =>
  useQuery(["user/one", userIdx], userInfoApi, { refetchOnMount: "always", ...options });
