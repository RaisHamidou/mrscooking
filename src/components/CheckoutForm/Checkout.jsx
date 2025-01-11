import React, { useContext, useEffect, useState } from "react";
import {
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { MyContext } from "@/context/Context";
import { useRouter } from "next/navigation";
const Checkout = ({ URL, email, name, surname, address, city, codePostal, country }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentCart, total, clearCart } = useContext(MyContext);

  const route = useRouter();

  const handleExpressCheckout = async (event) => {
    
    
    if (!stripe || !elements) {
      return;
    }
    const response = await fetch(`${URL}/api/payment/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: total * 100, name: name, surname:surname,  email: email, address:address, city:city, codePostal:codePostal, country:country }),
    });

    const { clientSecret } = await response.json();
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        clientSecret,
        elements,
        amount: total * 100,
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
            bookIds: currentCart.map((book) => book.id),
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
          amount: total * 100,
          currency: "eur",
          wallets: { paypal: "auto" },
          appearance: {
            theme: 'stripe',
          },
          
      
        }}
        
      />
     
 

    </>
  );
};

export default Checkout;
