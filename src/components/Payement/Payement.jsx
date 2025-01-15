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
    "pk_live_51QC2ngCtuk8oqqoGpx3c47XQenjJLX3OiK6P3YCV7A4YWXc7pvPEA0gecxJFhA4n5HmJuBS5BUGUEXtNMvkkxHq000gV9hyAAd"
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