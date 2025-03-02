"use client";
import React, { useState, useContext, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaCalendarDays, FaClock } from "react-icons/fa6";
import dayjs from 'dayjs';
import axios from "axios";
import { MyContext } from "@/context/Context";
import loader from "@/assets/gif/loader.gif";
import { useRouter } from "next/navigation";
import ThankYou from "../ThankYou/ThankYou";
import Checkout from "./Checkout";
import { countryCodes } from "../CountryCode/CountryCode";
import { usePromoCode } from "../promo/PromoCode";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { URL } from "../config/config";


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentCart, total, clearCart, price, promo, setPromo,isPromoValid } =
    useContext(MyContext);

  const [nameValue, setNameValue] = useState();
  const [surnameValue, setSurnameValue] = useState();
  const [emailValue, setEmailValue] = useState();
  const [numberValue, setNumberValue] = useState();
  const [adressValue, setAdressValue] = useState();
  const [cityValue, setCityValue] = useState();
  const [countryValue, setCountryValue] = useState();
  const [codePostalValue, setCodePostalValue] = useState();
  const [nameCardValue, setNameCardValue] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isInvalid, setIsInvalid] = useState();
  const [delvery, setDelvery] = useState();
  const [time, setTime] = useState()
  const [date, setDate] = useState()
  const route = useRouter();
  const [paymentStatus, setPaymentStatus] = useState(`Payer ${price} €`);


  const physique = currentCart.filter((f) => f.type === "physique");
  const ValidateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleEmail = (e) => {
    const email = e.target.value;
    setEmailValue(email);
    setIsEmailValid(ValidateEmail(email));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentStatus("paiement en cours...");
    if (!stripe || !elements) {
      return;
    }

    const response = await fetch(`https://www.mrscooking.com/api/payment/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: price,
        currentTotal: price,
        total:total,
        name: nameValue,
        surname: surnameValue,
        cardName: nameCardValue,
        email: emailValue,
        address: adressValue,
        city: cityValue,
        codePostal: codePostalValue,
        country: countryValue,
        products: currentCart,
       date:date,
          time:time,
          delvery:delvery
      }),
    });

    const { clientSecret } = await response.json();

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: nameCardValue,
            email: emailValue,
            address: {
              line1: adressValue,
              city: cityValue,

              postal_code: codePostalValue,
              country: countryValue,
            },
            phone: numberValue,
          },
        },
      }
    );

    if (error) {
      console.error(error.message);
      setPaymentStatus("Une erreur s'est produite, Veuillez réessayer");
      console.log(error.message);
      setTimeout(() => {
        setPaymentStatus(`Payer ${price/100} €`);
      }, 5000);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentStatus("Paiement réussi !");
      const bookIds = currentCart.map((book) => book.id);
      await fetch(`${URL}/api/payment/confirm-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          email: emailValue,
          name: nameValue,
          surname: surnameValue,
          bookIds: bookIds,
          amount: price,
          currentTotal: price,
          total:total,
          address: adressValue,
          city: cityValue,
          codePostal: codePostalValue,
          country: countryValue,
          products: currentCart,
          date:date,
          time:time,
          delvery:delvery
        }),
      });

      clearCart();
      route.push("/thank-you");
    }
  };

  const fields = {
    Email: !emailValue,
    invalidEmail: !isEmailValid,
    Nom: !nameValue,
    Prénom: !surnameValue,
    Adrésse: !adressValue,
    ville: !cityValue,
    CodePostal: !codePostalValue,
    pays: !countryValue,
   
         
  };
  if (physique.length > 0) {
    fields.date = !date;
    fields.time = !time;
}

  const invalidFields = Object.keys(fields).filter((key) => fields[key]);

  useEffect(() => {
    if (invalidFields.length === 1) {
      if (invalidFields.includes("Email")) {
        setIsInvalid("Veuillez mettre votre adresse email");
      } else if (invalidFields.includes("invalidEmail")) {
        setIsInvalid("Votre email est incorrect");
      } else if (invalidFields.includes("date")) {
        setIsInvalid(`Veuillez nous donner vos disponibilité`);
      } else if (invalidFields.includes("time")) {
        setIsInvalid(`Veuillez nous donner vos disponibilité`);
      } else {
        setIsInvalid(`Veuillez remplir le champ ${invalidFields[0]}`);
      }
    } else if (invalidFields.length > 1) {
      if (
        invalidFields.includes("Email") &&
        invalidFields.includes("invalidEmail") &&
        invalidFields.length === 2
      ) {
        setIsInvalid("Veuillez vérifier votre email");
      } else if (
        invalidFields.includes("Email") &&
        invalidFields.includes("invalidEmail")
      ) {
        setIsInvalid(`Veuillez remplir tout les champs et vérifier l'email.`);
      }
    }
  }, [showAlert, invalidFields]);

  const handleCountryChange = (e) => {
    setCountryValue(e.target.value);
  };

  const today = dayjs()
  const shouldDisableDate = (date)=>{
    return date.isAfter(today,"day") && date.isBefore(today.add(7,"day"),"day")
  }
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
                            <div>{post.price/100} €</div>
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
            <div className="price">
              {" "}
              {price != total ? (
                <span className="price-b">{total/100} €</span>
              ) : (
                `${total/100} €`
              )}
              {price != total ? `${price/100} €` : null}
              <span className="ttc">ttc</span>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPromo(e.target.promoInput.value.trim());
            }}
            className="form-promo"
          >
           {promo ? (
  isPromoValid ? (
    <p>Code promo appliqué !</p>
  ) : (
    <p>Votre code promo est expiré ou invalide</p>
  )
) : null}
            <div className="container-form-promo">
            <input
              name="promoInput"
              className="input-promo"
              placeholder="Entrez votre code promo"
            />
            <button type="submit">Validé</button>
            </div>

          </form>
        </div>
      </div>
      <div className="container-form">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="title-form">
            <h1>Finaliser votre commande</h1>
          </div>

          {showAlert && invalidFields.length > 0 && (
            <div className="alerte">
              <p>{isInvalid}</p>
            </div>
          )}
          <div className="input-elements">
            <input
              className="input-email"
              style={{}}
              onChange={handleEmail}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="pay-legal">
            <p>
              Entrez soigneusement votre email, vos ebooks et votre confirmation
              de commande seront directement envoyé dans votre boîte de
              réception.
            </p>
          </div>
          {physique.length > 0 ? (
            <div className="delvery-form">
            <div className="pay-legal">
            <p>
            Veuillez indiquer votre disponibilité pour récupérer votre 
            commande de gâteau. <span className="info-legal">Le retrait se fera à Paris, entre 11h et 19h.</span>  
            L'adresse vous sera envoyée par email avec la confirmation de votre 
            commande. Veuillez noter qu’un <span className="info-legal">délai de préparation d’une semaine </span>  est 
            nécessaire avant le retrait.
              </p>
            </div>
            
            <div className="input-date-container">
            <div className="input-with-icons">
            <DatePicker minDate={today} shouldDisableDate={shouldDisableDate} onChange={(newValue) => setDate(dayjs(newValue).format('MM/DD/YYYY'))} className="input-picker" sx={{
              "& input":{
                position:"relative",
                backgroundColor: "#D9D9D9",
                width:"100",
                borderRadius:20,
              },
              "& button":{
                background:"none",
          
                position:"relative",
                top:-5,
                backgroundColor: "#D9D9D9",
                
              },
              
    "& .MuiOutlinedInput-root": {
      position:"relative",
      backgroundColor: "#D9D9D9",
      display:"flex",
      alignItems:"center",
      
      "&:hover": { backgroundColor: "#D9D9D9" },
    },
    "& .MuiInputBase-input": {
      fontSize: "16px",
      color: "#333",
      
    },
    "& .MuiSvgIcon-root": {
      background: 'none', // Supprime le background
          alignSelf: 'center', // Centre l'icône verticalement
          fontSize: '1.5rem',
          color:"#757575"
    },
    '& .MuiOutlinedInput-notchedOutline': { border: 'none', }
  }} />
           {/*  <DatePicker className="input-picker"/> */}
            </div>
            <div className="input-with-icons">

             <TimePicker onChange={(newValue) => setTime(dayjs(newValue).format('HH:mm'))} ampm={false} minTime={dayjs().set('hour', 11).set('minute', 0)}  // 08:00
  maxTime={dayjs().set('hour', 19).set('minute', 0)}  className="input-picker" 
             
             sx={{
              "& input":{
                position:"relative",
                backgroundColor: "#D9D9D9",
                width:"100"
              },
              "& button":{
                background:"none",
          
                position:"relative",
                top:-5,
                backgroundColor: "#D9D9D9",
                
              },
              "& .MuiInputBase-root":{
                background:"blue"
              },
    "& .MuiOutlinedInput-root": {
      position:"relative",
      backgroundColor: "#D9D9D9",
      display:"flex",
      alignItems:"center",
      
      "&:hover": { backgroundColor: "#D9D9D9" },
    },
    "& .MuiInputBase-input": {
      fontSize: "16px",
      color: "#333",
      borderRadius:7,
    },
    "& .MuiSvgIcon-root": {
      background: 'none', // Supprime le background
          alignSelf: 'center', // Centre l'icône verticalement
          fontSize: '1.5rem',
          color:"#757575"
    },
    '& .MuiOutlinedInput-notchedOutline': { border: 'none', borderRadius:7, }
  }}  /> 
            </div>
          {/*   <div className="input-with-icons">
            <input className="input-date" onChange={(e)=> setDate(e.target.value)} type="date"/> 
            <FaCalendarDays className="icon"/>
            </div>
            <div className="input-with-icons">

            <input className="input-time" onChange={(e)=> setTime(e.target.value)} type="time" min="11:00" max="19:00"/>

            <FaClock className="icon"/>
            </div> */}
            </div>
              <textarea
                onChange={(e) => setDelvery(e.target.value)}
                placeholder="D'autre précision ?"
              />
            </div>
          ) : (
            ""
          )}
          <div className="facturation-title">
            <h3>Adresse de facturation</h3>
          </div>

          <div className="container-input-element">
            <div className="input-elements">
              <input
                onChange={(e) => setSurnameValue(e.target.value)}
                type="text"
                placeholder="Prénom"
                required
              />
              <input
                onChange={(e) => setNameValue(e.target.value)}
                type="text"
                placeholder="Nom"
                required
              />
            </div>
            <div className="input-elements">
              <input
                onChange={(e) => setAdressValue(e.target.value)}
                type="text"
                placeholder="Adresse"
                required
              />

              <input
                onChange={(e) => setCodePostalValue(e.target.value)}
                type="text"
                placeholder="Code postal"
                required
              />
            </div>
            <div className="input-elements">
              <input
                onChange={(e) => setCityValue(e.target.value)}
                type="text"
                placeholder="Ville"
                required
              />
              <select onChange={handleCountryChange} value={countryValue}>
                <option className="test-" value="">
                  Sélectionnez un pays
                </option>
                {Object.entries(countryCodes).map(([country, code]) => (
                  <option key={code} value={code}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="facturation-title">
            <h3>Payer par paypal</h3>
          </div>
          <div className="paypal-button">
            <Checkout
              URL={URL}
              email={emailValue}
              name={nameValue}
              surname={surnameValue}
              address={adressValue}
              city={cityValue}
              codePostal={codePostalValue}
              country={countryValue}
              date={date}
              delvery={delvery}
              time={time}
            />
            {invalidFields.length > 0 ? (
              <div
                onClick={() => setShowAlert(true)}
                className="check-button"
              />
            ) : null}
          </div>
          <div className="pay-legal">
            <p>
              En cliquant sur paypal, vous acceptez nos
              <a href="#" className="info-legal">
                conditions générales de vente
              </a>
              ainsi que nos
              <a href="#" className="info-legal">
                conditions générales d’utilisation.
              </a>
            </p>
          </div>
          <div className="separation">
            <span></span> ou <span></span>
          </div>
          <div className="facturation-title">
            <h3>Payer par carte</h3>
          </div>
          <div className="input-elements">
            <input
              className="name-card-input"
              onChange={(e) => setNameCardValue(e.target.value)}
              type="text"
              placeholder="Titulaire de la carte"
              required
            />
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
            Payer {price/100} €
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
        </form>
      </div>
      {paymentStatus === "Paiement réussi !" ? (
        <div className="status">
          <img src={loader.src} alt="" />
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default CheckoutForm;
