import { useMutation } from "@tanstack/react-query";
import { deletePlanLocationApi } from "../../api/cart";

export default () => useMutation(deletePlanLocationApi);
