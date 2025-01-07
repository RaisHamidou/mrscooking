"use client";
import React, { useState, useContext, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { MyContext } from "@/context/Context";
import loader from "@/assets/gif/loader.gif"
import { useRouter } from "next/navigation";
import ThankYou from "../ThankYou/ThankYou";
import Checkout from "./Checkout";
const CheckoutForm = ({URL}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("Payer");
  const [nameValue, setNameValue] = useState();
  const [emailValue, setEmailValue] = useState();
  const [numberValue, setNumberValue] = useState();
  const [adressValue, setAdressValue] = useState();
  const { currentCart, total, clearCart } = useContext(MyContext);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true)
 const route = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
setPaymentStatus("paiement en cours...")
    if (!stripe || !elements) {
      return;
    }

    // Appel à votre backend Express pour obtenir le client_secret
    const response = await fetch(
      `${URL}/api/payment/create-payment`,
      {
        method: "POST",
        headers: {
          
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total*100 }), // Montant en centimes (ex: 1000 = 10,00€)
      }
    );

    const { clientSecret } = await response.json();

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment( clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: nameValue, // Vous pouvez remplacer par une variable si vous collectez cette info
            email: emailValue,
            address: adressValue,
            phone: numberValue, // Idem ici
          },
        },
      }
    );

    if (error) {
      console.error(error.message);
      setPaymentStatus("Erreur : " + error.message);
    
      // Remettre le statut "Payer" après 5 secondes
      setTimeout(() => {
        setPaymentStatus("Payer");
      }, 5000);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentStatus("Paiement réussi !");
      const bookIds = currentCart.map(book => book.id)
      await fetch(`${URL}/api/payment/confirm-payment`, {
        method: "POST",
        headers: {
           
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id, // Correctement nommé
          email: emailValue,
          bookIds: bookIds,
      }),
    });
    
    clearCart()
      route.push("/thank-you")  
    }
  };
  useEffect(()=>{
if(nameValue && emailValue){
  setShowAlert(false)
}
},[nameValue, emailValue, showAlert])
  return (
    <section className="checkout">
      <div className="checkout-cart">
        <div className="title-form">
          <h1>Votre panier</h1>
        </div>
        
        <div className="Cart">
          <div className="container-product-added">
            {currentCart != null
              ? currentCart.map((post, index) => {
                  return (
                    <div key={post.id}>
                      <div className="product-added">
                        <div className="img-product-added">
                          <img src={post.img} alt="" />
                        </div>
                        <div className="product-info">
                          <div className="title-product">
                            <h2>{post.title}</h2>
                          </div>
                          <div className="containter-price">
                            <div>Prix :</div>
                            <div>{post.price} €</div>
                          </div>
                        </div>
                      </div>
                      {index !== currentCart.length - 1 && (
                        <div className="hr" />
                      )}
                    </div>
                  );
                })
              : null}
          </div>

          <div className="containter-total-price">
            <div className="total">Total</div>
            <div className="price">{`${total} €`}</div>
          </div>
        </div>
      </div>
      <div className="container-form">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="title-form">
            <h1>Finaliser votre commande</h1>
          </div>
          {showAlert ? <div className="alerte"><p>Veuillez renseigner votre nom complet et votre email</p></div>:null}
          <div className="input-elements">
            <input
              onChange={(e) => setNameValue(e.target.value)}
              type="text"
              placeholder="Nom complet"
            />

            <input
              onChange={(e) => setEmailValue(e.target.value)}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="pay-legal">
            <p>
              Entrez soigneusement votre email, vos ebook seront livré
              directement dans votre boîte de réception.
            </p>
          </div>
          <div className="paypal-button">
          <Checkout URL={URL} email={emailValue} name={nameValue}/>
          {!nameValue&& !emailValue || !emailValue || !nameValue ? <div onClick={()=>setShowAlert(true)} className="check-button"/>:null}
          </div>
          
<div className="separation">
 <span></span> ou <span></span>
</div>
          <div className="card-element">
            <CardElement
              options={{
                iconStyle: "solid",
                style: {
                  base: {
                    iconColor: "#8E8E8E",
                    color: "#ff4d6d",
                    fontWeight: 500,
                    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                    fontSize: "16px",
                    fontSmoothing: "antialiased",
                    ":-webkit-autofill": {
                      color: "#ff4d6d",
                    },
                    "::placeholder": {
                      color: "#8E8E8E",
                    },
                  },
                  invalid: {
                    iconColor: "#ffc7ee",
                    color: "#ffc7ee",
                  },
                },
              }}
            />
          </div>

          <button className="pay-btn" type="submit" disabled={!stripe}>
  
    {paymentStatus}
      
</button>
          <div className="pay-legal">
            <p>
              En cliquant sur Payer, vous acceptez nos 
              <a href="#" className="info-legal">
                conditions générales de vente
              </a>
              ainsi que nos
              <a href="#" className="info-legal">
                conditions générales d’utilisation.
              </a>
              
            </p>
          </div>
         {/*  {paymentStatus && <p>{paymentStatus}</p>} */}
        </form>
      </div>
      { paymentStatus === "Paiement réussi !" ?  (
         <div className="status">
      
       <img src={loader.src} alt="" />
      
      
      </div>):"" } 
     
     
    </section>
  );
};

export default CheckoutForm;