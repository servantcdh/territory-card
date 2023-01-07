import { useMutation } from "react-query";
import { recordCardApi } from "../../api/record";

export default () => useMutation(recordCardApi);
