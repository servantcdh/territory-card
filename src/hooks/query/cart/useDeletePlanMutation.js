import { useMutation } from "@tanstack/react-query";
import { deletePlanApi } from "../../api/cart";

export default () => useMutation(deletePlanApi);
