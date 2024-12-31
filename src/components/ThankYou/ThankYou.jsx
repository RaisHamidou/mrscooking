"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ThankYou = () => {
  return (
    <section className="thank-you">
      <div className="lottie">
        <DotLottieReact
          src="image/animation/check.lottie"
          loop={false}
          autoplay
        />
      </div>
      <div className="thank-you-info">
        <h2>Merci pour votre confiance !</h2>
        <p>
          Votre commande est maintenant <span>disponible dans votre boîte mail</span>. Nous
          vous souhaitons de délicieux moments en cuisine et une agréable
          découverte de nos recettes !
        </p>
      </div>
    </section>
  );
};

export default ThankYou;
