import React, { useCallback } from "react";
import { useQueries } from "@tanstack/react-query";
import { locationsApi } from "../../hooks/api/cart";
import useCreateLocationMutation from "../../hooks/query/cart/useCreateLocationMutation";
import useUpdateLocationMutation from "../../hooks/query/cart/useUpdateLocationMutation";
import useDeleteLocationMutation from "../../hooks/query/cart/useDeleteLocationMutation";
import CartLocationLayout from "../../components/templates/CartLocationLayout";

const CartLocationPage = () => {
  const { mutate: createCartLocationMutate } = useCreateLocationMutation();
  const { mutate: updateCartLocationMutate } = useUpdateLocationMutation();
  const { mutate: deleteCartLocationMutate } = useDeleteLocationMutation();
  const results = useQueries({
    queries: [
      {
        queryKey: ["locations"],
        queryFn: locationsApi,
        refetchInterval: 1000,
      },
    ],
  });
  const { data: locationsData } = results[0];
  const locations = locationsData ? locationsData : [];
  const onCreateHandler = useCallback(() => {
    createCartLocationMutate({
      lat: "37.24668244441506",
      lng: "127.06089155894465",
      name: "새로운 전시대 구역",
    });
  }, []);
  const onUpdateHandler = useCallback((data) => {
    updateCartLocationMutate(data);
  }, []);
  const onDeleteHandler = useCallback((data) => {
    deleteCartLocationMutate(data);
  }, []);
  return (
    <CartLocationLayout
      locations={locations}
      onCreate={onCreateHandler}
      onUpdate={onUpdateHandler}
      onDelete={onDeleteHandler}
    />
  );
};

export default CartLocationPage;
