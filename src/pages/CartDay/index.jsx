import React, { useCallback } from "react";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { dayApi } from "../../hooks/api/cart";
import useCreatePlanMutation from "../../hooks/query/cart/useCreatePlanMutation";
import useUpdatePlanMutation from "../../hooks/query/cart/useUpdatePlanMutation";
import useDeletePlanMutation from "../../hooks/query/cart/useDeletePlanMutation";
import CartDayLayout from "../../components/templates/CartDayLayout";

const CartDayPage = () => {
  const { dayCode } = useParams();
  const { mutate: createTimePlanMutate } = useCreatePlanMutation();
  const { mutate: updateTimePlanMutate } = useUpdatePlanMutation();
  const { mutate: deleteTimePlanMutate } = useDeletePlanMutation();
  const results = useQueries({
    queries: [
      {
        queryKey: ["cartDay/:dayCode", dayCode],
        queryFn: dayApi,
        refetchInterval: 1000,
      },
    ],
  });
  const { data: dayData } = results[0];
  const { idx, cartDayTime } = dayData ? dayData : { idx: 0, cartDayTime: [] };
  const onCreateHandler = useCallback((data) => {
    createTimePlanMutate(data);
  }, []);
  const onUpdateHandler = useCallback((data) => {
    updateTimePlanMutate(data);
  }, []);
  const onDeleteHandler = useCallback((data) => {
    deleteTimePlanMutate(data);
  }, []);
  return (
    <CartDayLayout
      cartDayIdx={idx}
      dayCode={dayCode}
      items={cartDayTime}
      onCreate={onCreateHandler}
      onUpdate={onUpdateHandler}
      onDelete={onDeleteHandler}
    />
  );
};

export default CartDayPage;
