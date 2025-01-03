
"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm"; 


const PaymentComponents = ({URL}) => {
    const stripePromise = loadStripe("pk_test_51QC2ngCtuk8oqqoGX1ed7LADRPRdPcHvZVXleH2S7s3Naa4SwSSV3nRQJGrvaTuRQA59t6kLbkoF2RtJQLUkKMnl00bvjqljuo");

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm URL={URL} /> 
        </Elements>
    );
};

// Export par défaut
export default PaymentComponents;
