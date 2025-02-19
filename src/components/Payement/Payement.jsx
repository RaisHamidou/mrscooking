"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { MyContext } from "@/context/Context";
import { useContext } from "react";

const PaymentComponents = ({ URL }) => {
  const { total, price } = useContext(MyContext);
 
  const amount = () => {
    if (price !== undefined && price > 0) {
      return price * 100;
    }
    if (total > 0) {
      return total * 100;
    }
    return 1; 
  };
const amountValue = amount()  
  const stripePromise = loadStripe(
    "pk_live_51QC2ngCtuk8oqqoGpx3c47XQenjJLX3OiK6P3YCV7A4YWXc7pvPEA0gecxJFhA4n5HmJuBS5BUGUEXtNMvkkxHq000gV9hyAAd"
  );
  const options = {
    mode: "payment",
    amount: amountValue,
    currency: "eur",
  };
  return (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm URL={URL} />
    </Elements>
  );
};

export default PaymentComponents;