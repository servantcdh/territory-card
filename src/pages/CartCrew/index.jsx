import React, { useCallback } from "react";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { locationsApi, planApi } from "../../hooks/api/cart";
import useCreatePlanLocationMutation from "../../hooks/query/cart/useCreatePlanLocationMutation";
import useAssignCartCrewsMutation from "../../hooks/query/cart/useAssignCartCrewsMutation";
import useResetPlanUsersMutation from "../../hooks/query/cart/useResetPlanUsersMutation";
import useDeletePlanLocationMutation from "../../hooks/query/cart/useDeletePlanLocationMutation";
import CartCrewLayout from "../../components/templates/CartCrewLayout";

const CartCrewPage = () => {
  const { cartDayTimeIdx } = useParams();
  const { mutate: useCreatePlanLocationMutate } =
    useCreatePlanLocationMutation();
  const { mutate: assignCartCrewsMutate } = useAssignCartCrewsMutation();
  const { mutate: resetPlanUsersMutate } = useResetPlanUsersMutation();
  const { mutate: deletePlanLocationMutate } = useDeletePlanLocationMutation();
  const results = useQueries({
    queries: [
      {
        queryKey: ["planApi/:cartDayTimeIdx", cartDayTimeIdx],
        queryFn: planApi,
        refetchInterval: 1000,
      },
      {
        queryKey: ["locations"],
        queryFn: locationsApi,
        refetchInterval: 1000,
      },
    ],
  });
  const { data: planData } = results[0];
  const { data: locationsData } = results[1];
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
  const locations = locationsData ? locationsData : [];
  const onCreatePlanLocationHandler = useCallback((data) => {
    useCreatePlanLocationMutate(data);
  }, []);
  const onAssignHandler = useCallback((data) => {
    assignCartCrewsMutate(data);
  }, []);
  const onDeletePlanLocationHandler = useCallback((data) => {
    deletePlanLocationMutate(data);
  }, []);
  const onResetHandler = useCallback((data) => {
    resetPlanUsersMutate(data);
  }, []);
  return (
    <CartCrewLayout
      cartDayTimeIdx={+cartDayTimeIdx}
      cartDayIdx={cartDayIdx}
      cartDayTimeLocation={cartDayTimeLocation}
      cartDayTimeUser={cartDayTimeUser}
      startTime={startTime}
      endTime={endTime}
      locations={locations}
      onAssign={onAssignHandler}
      onCreate={onCreatePlanLocationHandler}
      onDelete={onDeletePlanLocationHandler}
      onReset={onResetHandler}
    />
  );
};

export default CartCrewPage;
