// components/Payement/Payement.js
"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";  // Import correct de CheckoutForm

const stripePromise = loadStripe("pk_test_51QC2ngCtuk8oqqoGX1ed7LADRPRdPcHvZVXleH2S7s3Naa4SwSSV3nRQJGrvaTuRQA59t6kLbkoF2RtJQLUkKMnl00bvjqljuo");

const PaymentComponents = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />  {/* Assurez-vous que le composant est bien importé */}
        </Elements>
    );
};

// Export par défaut
export default PaymentComponents;
