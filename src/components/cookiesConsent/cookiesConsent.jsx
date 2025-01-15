"use client"

import { useState, useEffect } from 'react';
import { FaXmark } from "react-icons/fa6";


const CookieConsent = () => {
  const [isConsentGiven, setIsConsentGiven] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const consent = JSON.parse(localStorage.getItem('cookieConsent'));
    if (consent) {
      setIsConsentGiven(consent.accepted);
    } else {
      setIsConsentGiven(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({ accepted: true, analytics: true, marketing: false }));
    setIsConsentGiven(true);
    setIsModalOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({ accepted: true, analytics: false, marketing: false }));
    setIsConsentGiven(true);
    setIsModalOpen(false);
  };

  if (isConsentGiven) return null;
  return (
   <> 
      {!isModalOpen && (
        <div className="cookie-banner">

      <div className="cookie-banner-content">
      <h2>Nous utilisons des cookies</h2>
      <p>
        Ce site Web utilise des cookies et d'autres technologies de suivi 
        pour améliorer votre expérience de navigation aux fins suivantes : 
        pour activer les fonctionnalités de base du site Web, pour offrir 
        une meilleure expérience sur le site Web, pour mesurer votre intérêt 
        pour nos produits et services et pour personnaliser les interactions marketing, 
        pour diffuser des publicités plus pertinentes pour vous.
      </p>
      <div className="button-container">
        <button className="button-accept" onClick={handleAccept}>J'accepte</button>
        <button className="button-decline" onClick={handleDecline}>Je refuse</button>
      </div>
      <button className="button-preferences" onClick={() => setIsModalOpen(true)}>
        Changer mes préférences
        </button>
      </div>
      

    </div>
      )}
      {isModalOpen && (
        <div className="modal">
          <h2>Paramètres des cookies</h2>
          <p>Choisissez les types de cookies que vous souhaitez accepter :</p>
          <button onClick={handleAccept}>Accepter tous les cookies</button>
          <button onClick={handleDecline}>Refuser tous les cookies</button>
          {/* <button onClick={() => setIsModalOpen(false)}>Fermer</button> */}
          <div onClick={()=> setIsModalOpen(false)} className="quite">
            <FaXmark/>
          </div>
        </div>
      )}
      </>
  );
};

export default CookieConsent;