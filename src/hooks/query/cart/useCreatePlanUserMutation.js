import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlanUserApi } from "../../api/cart";

export default () => useMutation(createPlanUserApi);
