import { useMutation } from "@tanstack/react-query";
import { updateLocationApi } from "../../api/cart";

export default () => useMutation(updateLocationApi);
