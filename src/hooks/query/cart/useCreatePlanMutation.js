import { useMutation } from "@tanstack/react-query";
import { createPlanApi } from "../../api/cart";

export default () => useMutation(createPlanApi);
