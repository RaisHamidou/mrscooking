import React from "react";
import { ExpressCheckoutElement } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";

const PayPalCheckout = ({ onPaymentComplete }) => {
  return (
    <div className="paypal-checkout-container">
      <ExpressCheckoutElement
        options={{
          wallets: {
            paypal: "auto",
            applePay: "never",
            googlePay: "never",
            link: "never",
          },
        }}
        onConfirm={onPaymentComplete}
      />
    </div>
  );
};

PayPalCheckout.propTypes = {
  onPaymentComplete: PropTypes.func.isRequired,
};

export default PayPalCheckout;
