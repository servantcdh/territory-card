import { useMutation } from "react-query";
import { logoutApi } from "../../api/auth";

export default () => useMutation(logoutApi);
