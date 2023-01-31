import { useMutation } from "@tanstack/react-query";
import { createPlanLocationApi } from "../../api/cart";

export default () => useMutation(createPlanLocationApi);
