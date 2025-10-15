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

// Composant séparé pour le code promo avec gestion d'état local
const PromoCodeSection = ({ onPromoApplied }) => {
  const { promo, isPromoValid } = useContext(MyContext);
  const [isApplying, setIsApplying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promoCode = e.target.promoInput.value.trim();
    
    if (!promoCode) return;
    
    setIsApplying(true);
    
    try {
      // Désactiver Stripe pendant l'application du promo
      await onPromoApplied(promoCode);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-promo">
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
          disabled={isApplying}
        />
        <button type="submit" disabled={isApplying}>
          {isApplying ? "Application..." : "Validé"}
        </button>
      </div>
    </form>
  );
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentCart, total, clearCart, price, setPromo, isPromoValid } =
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
  
  const [paymentStatus, setPaymentStatus] = useState(`Payer ${price/100} €`);
  const [cardError, setCardError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [stripeEnabled, setStripeEnabled] = useState(true); // NOUVEAU STATE
  const [formKey, setFormKey] = useState(0);

  // Mettre à jour le paymentStatus quand le prix change
  useEffect(() => {
    setPaymentStatus(`Payer ${price/100} €`);
  }, [price]);

  const handlePromoApplied = async (promoCode) => {
    // DÉSACTIVER Stripe pendant la validation du promo
    setStripeEnabled(false);
    
    try {
      // Attendre un peu pour s'assurer que Stripe est désactivé
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Appliquer le promo
      setPromo(promoCode);
      
      // Attendre que le contexte soit mis à jour
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } finally {
      // RÉACTIVER Stripe et forcer la recréation des éléments
      setStripeEnabled(true);
      setFormKey(prev => prev + 1);
    }
  };

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

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripeEnabled) {
      setCardError("Veuillez patienter pendant l'application du code promo");
      return;
    }
    
    setPaymentStatus("paiement en cours...");
    setCardError(null);
    
    if (!stripe || !elements) {
      setCardError("Stripe n'est pas initialisé");
      return;
    }

    if (invalidFields.length > 0) {
      setShowAlert(true);
      setPaymentStatus(`Payer ${price/100} €`);
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        setCardError("Élément de carte non disponible.");
        setPaymentStatus(`Payer ${price/100} €`);
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
          total: total,
          name: nameValue,
          surname: surnameValue,
          cardName: nameCardValue,
          email: emailValue,
          address: adressValue,
          city: cityValue,
          codePostal: codePostalValue,
          country: countryValue,
          products: currentCart,
          date: date,
          time: time,
          delvery: delvery
        }),
      });

      const { clientSecret } = await response.json();

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
        setCardError(error.message);
        setPaymentStatus("Une erreur s'est produite, Veuillez réessayer");
        
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
            total: total,
            address: adressValue,
            city: cityValue,
            codePostal: codePostalValue,
            country: countryValue,
            products: currentCart,
            date: date,
            time: time,
            delvery: delvery
          }),
        });

        clearCart();
        route.push("/thank-you");
      }
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      setCardError("Une erreur inattendue s'est produite");
      setPaymentStatus(`Payer ${price/100} €`);
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
  const shouldDisableDate = (date) => {
    return date.isAfter(today, "day") && date.isBefore(today.add(7, "day"), "day")
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
          
          <PromoCodeSection onPromoApplied={handlePromoApplied} />
        </div>
      </div>
      
      {/* DÉSACTIVER TOUT LE FORMULAIRE STRIPE PENDANT LA VALIDATION PROMO */}
      <div key={formKey} className="container-form">
        <div className="checkout-form">
          <div className="title-form">
            <h1>Finaliser votre commande</h1>
          </div>

          {showAlert && invalidFields.length > 0 && (
            <div className="alerte">
              <p>{isInvalid}</p>
            </div>
          )}
          
          {cardError && (
            <div className="alerte card-error">
              <p>{cardError}</p>
            </div>
          )}

          {!stripeEnabled && (
            <div className="alerte info">
              <p>Application du code promo en cours...</p>
            </div>
          )}

          {/* ... TOUS VOS CHAMPS DE FORMULAIRE ... */}
          
          <div className="input-elements">
            <input
              className="input-email"
              onChange={handleEmail}
              type="email"
              placeholder="Email"
              required
              disabled={!stripeEnabled}
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
                  commande. Veuillez noter qu'un <span className="info-legal">délai de préparation d'une semaine </span> est 
                  nécessaire avant le retrait.
                </p>
              </div>
              
              <div className="input-date-container">
                <div className="input-with-icons">
                  <DatePicker 
                    minDate={today} 
                    shouldDisableDate={shouldDisableDate} 
                    onChange={(newValue) => setDate(dayjs(newValue).format('MM/DD/YYYY'))} 
                    className="input-picker" 
                    disabled={!stripeEnabled}
                    sx={{
                      "& input": {
                        position: "relative",
                        backgroundColor: "#D9D9D9",
                        width: "100",
                        borderRadius: 20,
                      },
                      "& button": {
                        background: "none",
                        position: "relative",
                        top: -5,
                        backgroundColor: "#D9D9D9",
                      },
                      "& .MuiOutlinedInput-root": {
                        position: "relative",
                        backgroundColor: "#D9D9D9",
                        display: "flex",
                        alignItems: "center",
                        "&:hover": { backgroundColor: "#D9D9D9" },
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "16px",
                        color: "#333",
                      },
                      "& .MuiSvgIcon-root": {
                        background: 'none',
                        alignSelf: 'center',
                        fontSize: '1.5rem',
                        color: "#757575"
                      },
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none', }
                    }} 
                  />
                </div>
                
                <div className="input-with-icons">
                  <TimePicker 
                    onChange={(newValue) => setTime(dayjs(newValue).format('HH:mm'))} 
                    ampm={false} 
                    minTime={dayjs().set('hour', 11).set('minute', 0)}
                    maxTime={dayjs().set('hour', 19).set('minute', 0)} 
                    className="input-picker"
                    disabled={!stripeEnabled}
                    sx={{
                      "& input": {
                        position: "relative",
                        backgroundColor: "#D9D9D9",
                        width: "100"
                      },
                      "& button": {
                        background: "none",
                        position: "relative",
                        top: -5,
                        backgroundColor: "#D9D9D9",
                      },
                      "& .MuiInputBase-root": {
                        background: "blue"
                      },
                      "& .MuiOutlinedInput-root": {
                        position: "relative",
                        backgroundColor: "#D9D9D9",
                        display: "flex",
                        alignItems: "center",
                        "&:hover": { backgroundColor: "#D9D9D9" },
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "16px",
                        color: "#333",
                        borderRadius: 7,
                      },
                      "& .MuiSvgIcon-root": {
                        background: 'none',
                        alignSelf: 'center',
                        fontSize: '1.5rem',
                        color: "#757575"
                      },
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none', borderRadius: 7, }
                    }} 
                  />
                </div>
              </div>
              
              <textarea
                onChange={(e) => setDelvery(e.target.value)}
                placeholder="D'autre précision ?"
                disabled={!stripeEnabled}
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
                disabled={!stripeEnabled}
              />
              <input
                onChange={(e) => setNameValue(e.target.value)}
                type="text"
                placeholder="Nom"
                required
                disabled={!stripeEnabled}
              />
            </div>
            <div className="input-elements">
              <input
                onChange={(e) => setAdressValue(e.target.value)}
                type="text"
                placeholder="Adresse"
                required
                disabled={!stripeEnabled}
              />
              <input
                onChange={(e) => setCodePostalValue(e.target.value)}
                type="text"
                placeholder="Code postal"
                required
                disabled={!stripeEnabled}
              />
            </div>
            <div className="input-elements">
              <input
                onChange={(e) => setCityValue(e.target.value)}
                type="text"
                placeholder="Ville"
                required
                disabled={!stripeEnabled}
              />
              <select onChange={handleCountryChange} value={countryValue} disabled={!stripeEnabled}>
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

          {/* Sélecteur de méthode de paiement */}
          <div className="payment-method-selector">
            <div className="payment-option">
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={!stripeEnabled}
              />
              <label htmlFor="card">Payer par carte</label>
            </div>
            <div className="payment-option">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={!stripeEnabled}
              />
              <label htmlFor="paypal">Payer par PayPal</label>
            </div>
          </div>

          {/* Section PayPal - DÉSACTIVÉE PENDANT LA VALIDATION */}
          {paymentMethod === 'paypal' && stripeEnabled && (
            <>
              <div className="facturation-title">
                <h3>Payer par PayPal</h3>
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
                {invalidFields.length > 0 && (
                  <div
                    onClick={() => setShowAlert(true)}
                    className="check-button"
                  />
                )}
              </div>
              
              <div className="pay-legal">
                <p>
                  En cliquant sur PayPal, vous acceptez nos
                  <a href="/legal/condition-general-de-vente" className="info-legal">
                    conditions générales de vente
                  </a>
                  ainsi que nos
                  <a href="/legal/condition-general-d-utilisation" className="info-legal">
                    conditions générales d'utilisation.
                  </a>
                </p>
              </div>
            </>
          )}

          {/* Section Carte Bancaire - DÉSACTIVÉE PENDANT LA VALIDATION */}
          {paymentMethod === 'card' && stripeEnabled && (
            <>
              
              
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
                  onChange={(event) => {
                    if (event.error) {
                      setCardError(event.error.message);
                    } else {
                      setCardError(null);
                    }
                  }}
                />
              </div>

              <button 
                className="pay-btn" 
                type="submit" 
                onClick={handleCardSubmit}
                disabled={!stripe || cardError || !stripeEnabled}
              >
                {paymentStatus}
              </button>
              
              <div className="pay-legal">
                <p>
                  En cliquant sur Payer, vous acceptez nos
                  <a href="/legal/condition-general-de-vente" className="info-legal">
                    conditions générales de vente
                  </a>
                  ainsi que nos
                  <a href="/legal/condition-general-d-utilisation" className="info-legal">
                    conditions générales d'utilisation.
                  </a>
                </p>
              </div>
            </>
          )}

          {/* Message pendant la validation */}
          {!stripeEnabled && (
            <div className="payment-disabled-message">
              <p>Application du code promo en cours, veuillez patienter...</p>
            </div>
          )}
        </div>
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