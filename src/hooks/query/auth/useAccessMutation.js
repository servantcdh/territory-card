import { useMutation } from "react-query";
import { accessApi } from "../../api/auth";

export default () => useMutation(accessApi);
