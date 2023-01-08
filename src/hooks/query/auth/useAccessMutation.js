import { useMutation } from "@tanstack/react-query";
import { accessApi } from "../../api/auth";

export default () => useMutation(accessApi);
