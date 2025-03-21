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
        Retrouvez 10 recettes de desserts incontournables et 
        faciles à réaliser pour vous régaler avec Mr. E-book 
        détaillé et bien expliqué afin de permettre à chacune 
        d’entre vous de réussir votre tête-à-tête avec Mr.
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
