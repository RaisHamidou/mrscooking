"use client";
import React, { useContext, useState, useEffect } from "react";
import bg from "../../assets/hero/OmBtXx8iBp2.png";
import { MyContext } from "@/context/Context";
import books from "../../../backend/data/books";
import img from "../../../public/image/book/ebook1.png";
const Hero = () => {
  const { addToCart, checkCart } = useContext(MyContext);

  const post = books[0];
  const isInCart = checkCart(post.id);
  return (
    <section className="hero">
      <div className="background">
        <img src={bg.src} alt="" />
      </div>
      <div className="overlay">
        <div className="container-overlay">
          <h1>Mrs Cooking</h1>
          <h2>Ebook 1 : 10 recettes de desserts édition tête-à-tête avec Mr</h2>
          <a
            href={
              "ebooks/ebook-1-:-10-recettes-de-desserts-edition-tete-a-tete-avec-mr"
            }
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                if (!isInCart) {
                  addToCart(post.id, post.titre, post.price, post.image);
                }
              }}
              disabled={isInCart}
              aria-disabled={isInCart}
              aria-label={
                isInCart
                  ? "Article déjà dans le panier"
                  : "Acheter maintenant ! "
              }
            >
              {" "}
              {isInCart ? "Déjà dans le panier" : "Acheter maintenant ! "}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
