"use client";
import React, { useState, useContext, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { MyContext } from "@/context/Context";
import loader from "@/assets/gif/loader.gif";
import { useRouter } from "next/navigation";
import ThankYou from "../ThankYou/ThankYou";
import Checkout from "./Checkout";
const CheckoutForm = ({ URL }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [nameValue, setNameValue] = useState();
  const [surnameValue, setSurnameValue] = useState();
  const [emailValue, setEmailValue] = useState();
  const [numberValue, setNumberValue] = useState();
  const [adressValue, setAdressValue] = useState();
  const [cityValue, setCityValue] = useState();
  const [countryValue, setCountryValue] = useState();
  const [codePostalValue, setCodePostalValue] = useState();
  const [nameCardValue, setNameCardValue] = useState();
  const { currentCart, total, clearCart } = useContext(MyContext);
  const [showAlert, setShowAlert] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isInvalid, setIsInvalid] = useState()
  const route = useRouter();
  const [paymentStatus, setPaymentStatus] = useState(`Payer ${total} €`);



  const ValidateEmail = (email)=>{
    const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
const handleEmail = (e) =>{
  const email = e.target.value
  setEmailValue(email)
  setIsEmailValid(ValidateEmail(email))
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentStatus("paiement en cours...")
        if (!stripe || !elements) {
          return;
        }

    const response = await fetch(`${URL}/api/payment/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total * 100,
        name: nameValue,
        surname: surnameValue,
        cardName: nameCardValue,
        email: emailValue,
        address: adressValue,
        city: cityValue,
        codePostal: codePostalValue,
        country: countryValue,
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
              country:countryValue,
            },
            phone: numberValue, 
          }, 
        },
      }
    );

    if (error) {
      console.error(error.message);
      setPaymentStatus("Une erreur s'est produite, Veuillez réessayer");
      console.log(error.message)
      setTimeout(() => {
        setPaymentStatus(`Payer ${total} €`);
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
          bookIds: bookIds,
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
}

const invalidFields = Object.keys(fields).filter((key) => fields[key]);

useEffect(()=>{
  if (invalidFields.length === 1) {
    if (invalidFields.includes('Email')) {
      setIsInvalid("Veuillez mettre votre adresse email") 
    } else if (invalidFields.includes('invalidEmail')) {
      setIsInvalid("Votre email est incorrect")
    } else {
      setIsInvalid(`Veuillez remplir le champ ${invalidFields[0]}`) 
    }
  } else if (invalidFields.length > 1) {
    if (invalidFields.includes('Email') && invalidFields.includes('invalidEmail') && invalidFields.length === 2) {
      setIsInvalid("Veuillez vérifier votre email") 
    } else if (invalidFields.includes('Email') && invalidFields.includes('invalidEmail')) {
      setIsInvalid(`Veuillez remplir tout les champs et vérifier l'email.`) 
    } 
  }
},[showAlert, invalidFields])


console.log(total)

const countryCodes = {
  'Afghanistan': 'AF',
  'Albanie': 'AL',
  'Algérie': 'DZ',
  'Andorre': 'AD',
  'Angola': 'AO',
  'Antigua-et-Barbuda': 'AG',
  'Argentine': 'AR',
  'Arménie': 'AM',
  'Australie': 'AU',
  'Autriche': 'AT',
  'Azerbaïdjan': 'AZ',
  'Bahamas': 'BS',
  'Bahreïn': 'BH',
  'Bangladesh': 'BD',
  'Barbade': 'BB',
  'Biélorussie': 'BY',
  'Belgique': 'BE',
  'Belize': 'BZ',
  'Bénin': 'BJ',
  'Bhoutan': 'BT',
  'Bolivie': 'BO',
  'Bosnie-Herzégovine': 'BA',
  'Botswana': 'BW',
  'Brésil': 'BR',
  'Brunei': 'BN',
  'Bulgarie': 'BG',
  'Burkina Faso': 'BF',
  'Burundi': 'BI',
  'Cap-Vert': 'CV',
  'Cambodge': 'KH',
  'Cameroun': 'CM',
  'Canada': 'CA',
  'République centrafricaine': 'CF',
  'Tchad': 'TD',
  'Chili': 'CL',
  'Chine': 'CN',
  'Colombie': 'CO',
  'Comores': 'KM',
  'Congo': 'CG',
  'République du Congo (République Démocratique)': 'CD',
  'Costa Rica': 'CR',
  'Croatie': 'HR',
  'Cuba': 'CU',
  'Chypre': 'CY',
  'République tchèque': 'CZ',
  'Danemark': 'DK',
  'Djibouti': 'DJ',
  'Dominique': 'DM',
  'République Dominicaine': 'DO',
  'Équateur': 'EC',
  'Égypte': 'EG',
  'Salvador': 'SV',
  'Guinée équatoriale': 'GQ',
  'Érythrée': 'ER',
  'Estonie': 'EE',
  'Eswatini': 'SZ',
  'Éthiopie': 'ET',
  'Fidji': 'FJ',
  'Finlande': 'FI',
  'France': 'FR',
  'Gabon': 'GA',
  'Gambie': 'GM',
  'Géorgie': 'GE',
  'Allemagne': 'DE',
  'Ghana': 'GH',
  'Grèce': 'GR',
  'Grenade': 'GD',
  'Guatemala': 'GT',
  'Guinée': 'GN',
  'Guinée-Bissau': 'GW',
  'Guyane': 'GY',
  'Haïti': 'HT',
  'Honduras': 'HN',
  'Hongrie': 'HU',
  'Islande': 'IS',
  'Inde': 'IN',
  'Indonésie': 'ID',
  'Iran': 'IR',
  'Irak': 'IQ',
  'Irlande': 'IE',
  'Israël': 'IL',
  'Italie': 'IT',
  'Jamaïque': 'JM',
  'Japon': 'JP',
  'Jordanie': 'JO',
  'Kazakhstan': 'KZ',
  'Kenya': 'KE',
  'Kiribati': 'KI',
  'Corée du Nord': 'KP',
  'Corée du Sud': 'KR',
  'Koweït': 'KW',
  'Kirghizistan': 'KG',
  'Laos': 'LA',
  'Lettonie': 'LV',
  'Liban': 'LB',
  'Lesotho': 'LS',
  'Liberia': 'LR',
  'Libye': 'LY',
  'Liechtenstein': 'LI',
  'Lituanie': 'LT',
  'Luxembourg': 'LU',
  'Madagascar': 'MG',
  'Malawi': 'MW',
  'Malaisie': 'MY',
  'Maldives': 'MV',
  'Mali': 'ML',
  'Malte': 'MT',
  'Îles Marshall': 'MH',
  'Mauritanie': 'MR',
  'Maurice': 'MU',
  'Mexique': 'MX',
  'Micronésie': 'FM',
  'Moldavie': 'MD',
  'Monaco': 'MC',
  'Mongolie': 'MN',
  'Monténégro': 'ME',
  'Maroc': 'MA',
  'Mozambique': 'MZ',
  'Myanmar': 'MM',
  'Namibie': 'NA',
  'Nauru': 'NR',
  'Népal': 'NP',
  'Pays-Bas': 'NL',
  'Nouvelle-Zélande': 'NZ',
  'Nicaragua': 'NI',
  'Niger': 'NE',
  'Nigeria': 'NG',
  'Macédoine du Nord': 'MK',
  'Norvège': 'NO',
  'Oman': 'OM',
  'Pakistan': 'PK',
  'Palaos': 'PW',
  'Panama': 'PA',
  'Papouasie-Nouvelle-Guinée': 'PG',
  'Paraguay': 'PY',
  'Pérou': 'PE',
  'Philippines': 'PH',
  'Pologne': 'PL',
  'Portugal': 'PT',
  'Qatar': 'QA',
  'Roumanie': 'RO',
  'Russie': 'RU',
  'Rwanda': 'RW',
  'Saint-Kitts-et-Nevis': 'KN',
  'Sainte-Lucie': 'LC',
  'Saint-Vincent-et-les Grenadines': 'VC',
  'Samoa': 'WS',
  'Saint-Marin': 'SM',
  'São Tomé-et-Principe': 'ST',
  'Sénégal': 'SN',
  'Serbie': 'RS',
  'Seychelles': 'SC',
  'Sierra Leone': 'SL',
  'Singapour': 'SG',
  'Slovaquie': 'SK',
  'Slovénie': 'SI',
  'Îles Salomon': 'SB',
  'Somalie': 'SO',
  'Afrique du Sud': 'ZA',
  'Sri Lanka': 'LK',
  'Soudan': 'SD',
  'Soudan du Sud': 'SS',
  'Suriname': 'SR',
  'Suède': 'SE',
  'Suisse': 'CH',
  'Syrie': 'SY',
  'Tadjikistan': 'TJ',
  'Tanzanie': 'TZ',
  'Tchad': 'TD',
  'Thaïlande': 'TH',
  'Timor oriental': 'TL',
  'Togo': 'TG',
  'Tonga': 'TO',
  'Trinité-et-Tobago': 'TT',
  'Tunisie': 'TN',
  'Turkménistan': 'TM',
  'Turquie': 'TR',
  'Tuvalu': 'TV',
  'Uganda': 'UG',
  'Ukraine': 'UA',
  'Uruguay': 'UY',
  'Vanuatu': 'VU',
  'Vatican': 'VA',
  'Venezuela': 'VE',
  'Vietnam': 'VN',
  'Yémen': 'YE',
  'Zambie': 'ZM',
  'Zimbabwe': 'ZW',
};



const handleCountryChange = (e) => {
  setCountryValue(e.target.value);
};

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
            <div className="price">{`${total} €`} <span className="ttc">TTC</span></div>
          </div>
        </div>
      </div>
      <div className="container-form">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="title-form">
            <h1>Finaliser votre commande</h1>
          </div>

          { showAlert && invalidFields.length > 0 && (
            <div className="alerte">
              <p>{isInvalid}</p>
            </div>
          )}
          <div className="input-elements">
            <input
            className="input-email"
              style={{ }}
              onChange={handleEmail}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="pay-legal">
            <p>
              Entrez soigneusement votre email, vos ebooks seront livré
              directement dans votre boîte de réception.
            </p>
          </div>
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
                onChange={(e) => setCityValue(e.target.value)}
                type="text"
                placeholder="Ville"
                required
              />
            </div>
            <div className="input-elements">
              <input
                onChange={(e) => setCodePostalValue(e.target.value)}
                type="text"
                placeholder="Code postal"
                required
              />
              {/* <input
                onChange={(e) => setCountryValue(e.target.value)}
                type="text"
                placeholder="Pays"
                required
              /> */}
              <select onChange={handleCountryChange} value={countryValue}>
        <option className="test-" value="">Sélectionnez un pays</option>
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
          <div 
        
          className="paypal-button">

            <Checkout
              URL={URL}
              email={emailValue}
              name={nameValue}
              surname={surnameValue}
              address={adressValue}
              city={cityValue}
              codePostal={codePostalValue}
              country={countryValue}
             
            />
            { invalidFields.length > 0 ? ( <div onClick={() => setShowAlert(true)} className="check-button" />) : null}

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
