"use client";
import React, { useContext } from "react";
import book from "../../assets/book/ebook1.png";
import Link from "next/link";
import books from "../../../backend/data/books";
import { MyContext } from "@/context/Context";
const Book = () => {
  const { addToCart, checkCart } = useContext(MyContext);

  const post = books[0];
  const isInCart = checkCart(post.id);
  return (
    <section id="book">
      <div className="container-info-book">
        <h1>Ebook 1 : 10 recettes de desserts édition tête-à-tête avec Mr</h1>
        <p className="info-book">
        Envie de faire fondre Mr. avec des desserts aussi gourmands que faciles à réaliser ? <br/> <br/>  
       Cet e-book exclusif a été pensé pour t’accompagner pas à pas et t’aider à réussir, sans stress, 
       un moment complice et savoureux à deux.<br/> <br/>  À l’intérieur, tu découvriras 10 recettes i
       ncontournables, détaillées et accessibles, conçues pour impressionner tout en te faisant plaisir. 
       Chaque recette est expliquée étape par étape pour garantir une réussite à coup sûr.<br/> <br/>  
      
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (!isInCart) {
              addToCart(post.id, post.titre, post.price, post.image);
            }
          }}
          disabled={isInCart}
          aria-disabled={isInCart}
          aria-label={isInCart ? "Déjà dans le panier" : "Acheter"}
          className="book-btn-link"
        >
          {isInCart ? "Déjà dans le panier" : "Acheter"}
        </button>
        <div className="see-more">
        <a href="ebooks/pack-desserts-et-plats">En savoir +</a>
        </div>
        
      </div>
      <div className="book-img">
        <a
          href={
            "/ebooks/pack-desserts-et-plats"
          }
        >
          <img src={book.src} alt="book" />
        </a>
      </div>
    </section>
  );
};

export default Book;
