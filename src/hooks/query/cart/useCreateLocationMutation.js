import { useMutation } from "@tanstack/react-query";
import { createLocationApi } from "../../api/cart";

export default () => useMutation(createLocationApi);
