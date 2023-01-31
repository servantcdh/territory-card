import { useMutation } from "@tanstack/react-query";
import { assignCartCrewsApi } from "../../api/cart";

export default () => useMutation(assignCartCrewsApi);
