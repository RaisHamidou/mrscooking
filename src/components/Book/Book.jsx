"use client"
import React from "react";
import book from "../../assets/book/ebook1.png";
import Link from "next/link";
const Book = () => {
  const addToCart = ()=>{
    localStorage.setItem("book", JSON.stringify([{title: "titre du livre", price: "15€"}]))
  }
  function formatString(str) {
    return str
        .normalize("NFD") // Décompose les caractères accentués en caractères de base et leurs diacritiques
        .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques (accents)
        .replace(/\s+/g, "-") // Remplace les espaces par des tirets
        .toLowerCase(); // Convertit la chaîne en minuscules (optionnel)
}
  return (
    <section id="book">
      <div className="container-info-book">
        <h1>Ebook 1 : 10 recettes de desserts édition tête-à-tête avec Mr</h1>
        <p className="info-book">
            Retrouvez 10 recettes de desserts incontournables et 
            faciles à réaliser pour vous régaler avec Mr. E-book détaillé 
            et bien expliqué afin de permettre à chacune d’entre vous de réussir votre tête-à-tête avec Mr.
          </p>
          <a className="book-btn-link" href={"ebooks/ebook-1-:-10-recettes-de-desserts-edition-tete-a-tete-avec-mr"}> 
            Acheter
          </a>
      </div>
      <div className="book-img">
        <img src={book.src} alt="book" />
      </div>
    </section>
  );
};

export default Book;
