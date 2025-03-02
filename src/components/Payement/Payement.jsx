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
const amountValue = amount()  
  const stripePromise = loadStripe(
    "pk_test_51Qp72mBGRP0qKyRodwRrKWsFTdHgwkDeTCAbX4eDABGs4F8s3OZN1sdCsqEStci2ts5tzWUnUX0Q92LJI8Getu3t00jfMd4UrH"
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