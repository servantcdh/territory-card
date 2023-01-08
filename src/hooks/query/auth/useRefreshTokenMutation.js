import { useMutation } from "@tanstack/react-query";
import { refreshTokenApi } from "../../api/auth";

export default () => useMutation(refreshTokenApi);
