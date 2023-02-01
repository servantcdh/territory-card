import React, { useCallback } from "react";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { planApi } from "../../hooks/api/cart";
import useAssignCartCrewsMutation from "../../hooks/query/cart/useAssignCartCrewsMutation";
import useResetPlanUsersMutation from "../../hooks/query/cart/useResetPlanUsersMutation";
import useDeletePlanLocationMutation from "../../hooks/query/cart/useDeletePlanLocationMutation";
import CartCrewLayout from "../../components/templates/CartCrewLayout";

const CartCrewPage = () => {
  const { cartDayTimeIdx } = useParams();
  const { mutate: assignCartCrewsMutation } = useAssignCartCrewsMutation();
  const { mutate: resetPlanUsersMutate } = useResetPlanUsersMutation();
  const { mutate: deletePlanLocationMutation } =
    useDeletePlanLocationMutation();
  const results = useQueries({
    queries: [
      {
        queryKey: ["planApi/:cartDayTimeIdx", cartDayTimeIdx],
        queryFn: planApi,
        refetchInterval: 1000,
      },
    ],
  });
  const { data: planData } = results[0];
  const {
    cartDayIdx,
    cartDayTimeLocation,
    cartDayTimeUser,
    startTime,
    endTime,
  } = planData
    ? planData
    : {
        cartDayIdx: 0,
        cartDayTimeLocation: [],
        cartDayTimeUser: [],
        startTime: "",
        endTime: "",
      };
  const onAssignHandler = useCallback((data) => {
    assignCartCrewsMutation(data);
  }, []);
  const onResetHandler = useCallback((data) => {
    resetPlanUsersMutate(data);
  }, []);
  const onDeleteHandler = useCallback((data) => {
    deletePlanLocationMutation(data);
  }, []);
  return (
    <CartCrewLayout
      cartDayIdx={cartDayIdx}
      cartDayTimeLocation={cartDayTimeLocation}
      cartDayTimeUser={cartDayTimeUser}
      startTime={startTime}
      endTime={endTime}
    />
  );
};

export default CartCrewPage;
