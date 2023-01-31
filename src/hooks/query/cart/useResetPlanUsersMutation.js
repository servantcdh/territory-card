import { useMutation } from "@tanstack/react-query";
import { resetPlanUsersApi } from "../../api/cart";

export default () => useMutation(resetPlanUsersApi);
