import { useQuery } from "react-query";
import { assignedCardApi } from "../../api/assign";

export default (idx, options) =>
  useQuery([`assignedCard/${idx}`, idx], assignedCardApi, { refetchOnMount: "always", ...options });
