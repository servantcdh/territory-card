import { useQuery } from "react-query";
import { addressSearch } from "../../kakaoMap";

export default (address, options) =>
  useQuery([`addressSearch/${address}`, address], addressSearch, { refetchOnMount: "always", ...options });
