"use client"
import React from "react";
import bg from "../../assets/hero/OmBtXx8iBp2.png";

const Hero = () => {
 
  
  
  return (
    <section className="hero">
      <div className="background">
        <img src={bg.src} alt="" />
      </div>
      <div className="overlay">
        <div className="container-overlay">
          <h1>Mrs Cooking</h1>
          <h2>Ebook 1 : 10 recettes de desserts édition tête-à-tête avec Mr</h2>
          <a href={"ebooks/ebook-1-:-10-recettes-de-desserts-edition-tete-a-tete-avec-mr"}>
          <button >Acheter maintenant !</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
