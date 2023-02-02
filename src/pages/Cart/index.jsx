import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { planApi } from "../../hooks/api/cart";
import { myInfoApi } from "../../hooks/api/user";
import useCreatePlanUserMutation from "../../hooks/query/cart/useCreatePlanUserMutation";
import useDeletePlanUserMutation from "../../hooks/query/cart/useDeletePlanUserMutation";
import CartLayout from "../../components/templates/CartLayout";
import CartWaitLayout from "../../components/templates/CartWaitLayout";
import SuspenseLayout from "../../components/templates/SuspenseLayout";

const CartPage = () => {
  const { cartDayTimeIdx } = useParams();
  const [isCrew, setIsCrew] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const navigate = useNavigate();
  const { mutate: createPlanUserMutate } = useCreatePlanUserMutation();
  const { mutate: deletePlanUserMutation } = useDeletePlanUserMutation();
  const results = useQueries({
    queries: [
      {
        queryKey: [`planApi/${cartDayTimeIdx}`, cartDayTimeIdx],
        queryFn: planApi,
        refetchInterval: 1000,
      },
      {
        queryKey: ["myInfo"],
        queryFn: myInfoApi,
        refetchOnMount: "always",
      },
    ],
  });
  const { data: planData, isSuccess: hasPlan } = results[0];
  const { data: myInfo, isSuccess: hasMyInfo } = results[1];
  const { userIdx: myIdx } = myInfo ? myInfo : { userIdx: 0 };
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
  const onDeleteHandler = useCallback((data) => {
    deletePlanUserMutation(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  }, []);
  let cartDayTimeUserIdx = 0;
  const timeUserIdxes = cartDayTimeUser.map(({ idx, userIdx }) => {
    if (myIdx === userIdx) {
      cartDayTimeUserIdx = idx;
    }
    return userIdx;
  });
  const crewsIdxes = cartDayTimeLocation.reduce(
    (crewIdxes, { cartCrewAssigned }) => {
      const userIdxes = cartCrewAssigned.map(({ cartDayTimeUser }) => {
        const { userIdx } = cartDayTimeUser;
        return userIdx;
      });
      return crewIdxes.concat(userIdxes);
    },
    []
  );
  const entryUserIdxes = timeUserIdxes.concat(crewsIdxes);
  const isSuccess = hasPlan && hasMyInfo;
  useEffect(() => {
    if (!isSuccess || isInit) {
      return;
    }
    if (!entryUserIdxes.includes(myIdx)) {
      setIsInit(true);
      createPlanUserMutate(
        {
          userIdx: myIdx,
          cartDayTimeIdx: +cartDayTimeIdx,
        }
      );
    }
  }, [isSuccess, isInit, entryUserIdxes, myIdx]);
  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    if (crewsIdxes.includes(myIdx)) {
      setIsCrew(true);
    }
  }, [isSuccess, crewsIdxes, myIdx]);
  return (
    <Suspense fallback={<SuspenseLayout />}>
      {isSuccess && (
        <>
          {!isCrew && (
            <CartWaitLayout
              cartDayIdx={cartDayIdx}
              cartDayTimeUser={cartDayTimeUser}
              cartDayTimeUserIdx={cartDayTimeUserIdx}
              startTime={startTime}
              endTime={endTime}
              onDelete={onDeleteHandler}
            />
          )}
          {isCrew && (
            <CartLayout
              cartDayIdx={cartDayIdx}
              cartDayTimeLocation={cartDayTimeLocation}
              startTime={startTime}
              endTime={endTime}
            />
          )}
        </>
      )}
    </Suspense>
  );
};

export default CartPage;
