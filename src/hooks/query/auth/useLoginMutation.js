import { useMutation } from "react-query";
import { loginApi } from "../../api/auth";

export default () => useMutation(loginApi);
