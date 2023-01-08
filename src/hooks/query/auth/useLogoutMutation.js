import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../../api/auth";

export default () => useMutation(logoutApi);
