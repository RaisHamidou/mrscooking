"use client"
import React from "react";
import bg from "../../assets/hero/OmBtXx8iBp2.png";

const Hero = () => {
 
  const addToCart = ()=>{
    localStorage.setItem("book", JSON.stringify({title: "titre du livre", price: "15€"}))
  }
  
  return (
    <section className="hero">
      <div className="background">
        <img src={bg.src} alt="" />
      </div>
      <div className="overlay">
        <div className="container-overlay">
          <h1>Titre</h1>
          <h2>Sous titre</h2>
          <button onClick={addToCart}>Acheter maintenant !</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
