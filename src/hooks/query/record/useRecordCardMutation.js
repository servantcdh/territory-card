import { useMutation } from "@tanstack/react-query";
import { recordCardApi } from "../../api/record";

export default () => useMutation(recordCardApi);
