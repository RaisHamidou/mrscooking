import React, { useContext, useEffect, useState } from "react";
import {
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { MyContext } from "@/context/Context";
import { useRouter } from "next/navigation";
import { URL } from "../config/config";
const Checkout = ({
  email,
  name,
  surname,
  address,
  city,
  codePostal,
  country,
  delvery,
  date,
  time
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentCart, total, clearCart, price } = useContext(MyContext);

  const route = useRouter();
console.log(URL)
  const handleExpressCheckout = async (event) => {
    if (!stripe || !elements) {
      return;
    }
    const response = await fetch(`https://www.mrscooking.com/api/payment/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       
            email: email,
            name: name,
            surname:surname,  
            bookIds: currentCart.map((book) => book.id),
            amount:  price, 
            total:total,
            address:address, 
            city:city, 
            codePostal:codePostal, 
            country:country,
            products:currentCart,
            delvery:delvery,
            date:date,
            time:time,
      }),
    });

    const { clientSecret } = await response.json();
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        clientSecret,
        elements,
       amount: price,
        currency: "eur",
        payment_method: {},
        confirmParams: {
          return_url: `${URL}/thank-you`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Erreur lors de la confirmation :", error.message);
        alert("Une erreur est survenue lors du paiement.");
      } else if (paymentIntent?.status === "succeeded") {
        route.push("/thank-you");

        clearCart();
        await fetch(`${URL}/api/payment/confirm-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            email: email,
            name: name,
            surname:surname,  
            bookIds: currentCart.map((book) => book.id),
           amount:  price,
            currentTotal: price,
            total:total,
            address:address, 
            city:city, 
            codePostal:codePostal, 
            country:country,
            products:currentCart,
            delvery:delvery,
            date:date,
            time:time,
          }),
        });
      }
    } catch (error) {
      console.error("Erreur lors de la confirmation du paiement :", error);
    }
  };


  return (
    <>
      <ExpressCheckoutElement
        onConfirm={handleExpressCheckout}
        options={{
          amount: price,
          currency: "eur",
          wallets: { paypal: "auto" },
          appearance: {
            theme: "stripe",
          },
        }}
      />
    </>
  );
};

export default Checkout;
