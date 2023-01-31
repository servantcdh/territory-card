import { useMutation } from "@tanstack/react-query";
import { deletePlanUserApi } from "../../api/cart";

export default () => useMutation(deletePlanUserApi);
