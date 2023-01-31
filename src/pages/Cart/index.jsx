import React from "react";
import CartLayout from "../../components/templates/CartLayout";
import CartWaitLayout from "../../components/templates/CartWaitLayout";

const CartPage = () => {
  return (
    <>
      {false && <CartWaitLayout />}
      {true && <CartLayout />}
    </>
  );
};

export default CartPage;
