"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { MyContext } from "@/context/Context";
import { useContext, useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_live_51QC2ngCtuk8oqqoGpx3c47XQenjJLX3OiK6P3YCV7A4YWXc7pvPEA0gecxJFhA4n5HmJuBS5BUGUEXtNMvkkxHq000gV9hyAAd"
);

const PaymentComponents = () => {
  const { total, price } = useContext(MyContext);
  const [clientSecret, setClientSecret] = useState(null);

  const amount = price && price > 0 ? price : total;

  useEffect(() => {
    if (!amount || amount < 1) return;

    fetch("https://www.mrscooking.com/api/payment/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(amount), // ex: 1299
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch(console.error);
  }, [amount]);

  if (!clientSecret) {
    return <p>Chargement du paiement…</p>;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret }}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentComponents;
