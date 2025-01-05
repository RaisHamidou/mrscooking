import React from "react";
import { ExpressCheckoutElement } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";

const PayPalCheckout = ({ clientSecret, onPaymentComplete }) => {
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
        clientSecret={clientSecret}
      />
    </div>
  );
};

PayPalCheckout.propTypes = {
  clientSecret: PropTypes.string.isRequired,
};

export default PayPalCheckout;