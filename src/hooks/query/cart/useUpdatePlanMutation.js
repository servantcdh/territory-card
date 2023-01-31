import { useMutation } from "@tanstack/react-query";
import { updatePlanApi } from "../../api/cart";

export default () => useMutation(updatePlanApi);
