"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { MyContext } from "@/context/Context";
import { useContext } from "react";

const PaymentComponents = () => {
  const { total, price } = useContext(MyContext);
 
  const amount = () => {
    if (price !== undefined && price > 0) {
      return price;
    }
    if (total > 0) {
      return total;
    }
    return 1; 
  };
  console.log()
const amountValue = amount()  
  const stripePromise = loadStripe(
    "process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY"
  );
  const options = {
    mode: "payment",
    amount: amountValue,
    currency: "eur",
  };
  return (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentComponents;