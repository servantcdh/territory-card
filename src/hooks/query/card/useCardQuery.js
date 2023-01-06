import { useQuery } from "react-query";
import { cardApi } from "../../api/card";

export default (idx, options) =>
  useQuery([`card/${idx}`, idx], cardApi, { refetchInterval: 2000, ...options });
