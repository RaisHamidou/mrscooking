"use client";

import { ExpressCheckoutElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { MyContext } from "@/context/Context";
import { useRouter } from "next/navigation";

const ExpressCheckoutWrapper = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentCart, clearCart, price, total } = useContext(MyContext);
  const router = useRouter();

  const onConfirm = async (event) => {
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error(submitError);
      return;
    }

    // Récupérer les données de billing depuis l'event
    const { billingDetails } = event;

    try {
      // Créer le PaymentIntent
      const response = await fetch("https://www.mrscooking.com/api/payment/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          currentTotal: price,
          total: total,
          name: billingDetails?.name || "",
          email: billingDetails?.email || "",
          address: billingDetails?.address?.line1 || "",
          city: billingDetails?.address?.city || "",
          codePostal: billingDetails?.address?.postal_code || "",
          country: billingDetails?.address?.country || "",
          products: currentCart,
        }),
      });

      const { clientSecret } = await response.json();

      // Confirmer le paiement
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "https://www.mrscooking.com/thank-you",
        },
        redirect: "if_required",
      });

      if (error) {
        console.error(error.message);
        // Gérer l'erreur
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        const bookIds = currentCart.map((book) => book.id);

        await fetch("https://www.mrscooking.com/api/payment/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            email: billingDetails?.email,
            name: billingDetails?.name,
            bookIds: bookIds,
            amount: price,
            products: currentCart,
          }),
        });

        clearCart();
        router.push("/thank-you");
      }
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
    }
  };

  return (
    <div className="express-checkout-container">
      <ExpressCheckoutElement 
        onConfirm={onConfirm}
        options={{
  buttonType: {
    paypal: 'paypal',
  },
}}
      />
    </div>
  );
};

export default ExpressCheckoutWrapper;
