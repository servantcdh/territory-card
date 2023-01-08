import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/auth";

export default () => useMutation(loginApi);
