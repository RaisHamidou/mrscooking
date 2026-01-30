import React, { useContext } from "react";
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

 const handleExpressCheckout = async () => {
  if (!stripe || !elements) return;

  const response = await fetch(
    "https://www.mrscooking.com/api/payment/create-payment",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        surname,
        bookIds: currentCart.map((b) => b.id),
        amount: Number(price),
        total,
        address,
        city,
        codePostal,
        country,
        products: currentCart,
        delvery,
        date,
        time,
      }),
    }
  );

  const { clientSecret } = await response.json();

  const { error, paymentIntent } = await stripe.confirmPayment({
    elements,
    clientSecret,
    confirmParams: {
      return_url: `${URL}/thank-you`,
    },
    redirect: "if_required",
  });

  if (error) {
    console.error(error.message);
    alert(error.message);
  }
};


  return (
    <>
      {/* N'afficher que si le prix est chargé et valide */}
      {price && Number(price) > 0 ? (
        <ExpressCheckoutElement
          onConfirm={handleExpressCheckout}
          options={{
            amount: Number(price),
            currency: "eur",
            wallets: { paypal: "auto" },
            appearance: {
              theme: "stripe",
            },
          }}
        />
      ) : (
        <p>Chargement du module de paiement...</p>
      )}
    </>
  );
};

export default Checkout;