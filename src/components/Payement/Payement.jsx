"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { MyContext } from "@/context/Context";
import { useContext } from "react";

const PaymentComponents = ({ URL }) => {
  const { total } = useContext(MyContext);
  const amount = total > 0 ? total * 100 : 1;

  const stripePromise = loadStripe(
    "pk_test_51QC2ngCtuk8oqqoGX1ed7LADRPRdPcHvZVXleH2S7s3Naa4SwSSV3nRQJGrvaTuRQA59t6kLbkoF2RtJQLUkKMnl00bvjqljuo"
  );
  const options = {
    mode: "payment",
    amount: amount,
    currency: "eur",
  };
  return (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm URL={URL} />
    </Elements>
  );
};

export default PaymentComponents;
