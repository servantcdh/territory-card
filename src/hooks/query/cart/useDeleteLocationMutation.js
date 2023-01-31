import { useMutation } from "@tanstack/react-query";
import { deleteLocationApi } from "../../api/cart";

export default () => useMutation(deleteLocationApi);
