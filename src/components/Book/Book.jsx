"use client";
import React, { useContext } from "react";
import book from "../../assets/book/ebook1.png";
import Link from "next/link";
import books from "../../../backend/data/books";
import { MyContext } from "@/context/Context";
const Book = () => {
  const { addToCart, checkCart } = useContext(MyContext);

  const post = books[2];
  const isInCart = checkCart(post.id);
  return (
    <section id="book">
      <div className="container-info-book">
        <h1>Pack desserts et plats</h1>
        <p className="info-book">
        Un pack avec les deux premiers E-books recettes 
        desserts et plats pour vous régaler. Des recettes 
        incontournables et faciles à réaliser.
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
