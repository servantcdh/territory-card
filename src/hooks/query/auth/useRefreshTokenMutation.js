import { useMutation } from "react-query";
import { refreshTokenApi } from "../../api/auth";

export default () => useMutation(refreshTokenApi);
