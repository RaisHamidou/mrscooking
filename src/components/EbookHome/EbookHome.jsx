"use client"
import { useContext, useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Cards from "@/components/Cards/Cards";
import { MyContext } from "@/context/Context";
import URL from "../config/config";
import axios from "axios";
import Link from "next/link";

const EbookHome  = () => {
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState()
  const { addToCart, checkCart } = useContext(MyContext);
  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);

      const response = await axios.get(`${URL}/api/books`, {
        method: "GET",
        headers: {
          Authorization:"bejaia1984",
          Accept: "Application/json",
        },
      });

      setBooks(response.data);
      setLoading(false);
    };
    loadPost();
  }, []);
  function formatString(str) {
    return str
        .normalize("NFD") // Décompose les caractères accentués en caractères de base et leurs diacritiques
        .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques (accents)
        .replace(/\s+/g, "-") // Remplace les espaces par des tirets
        .toLowerCase(); // Convertit la chaîne en minuscules (optionnel)
}
  return (
    <section id="ebooks">
      <div className="books-page-hero">
        <h1>Mes derniers ebooks</h1>
      </div>

      <div className="container-cards-16-9">
            {books&&books.map((post) => {
                const isInCart = checkCart(post.id);

                return (
                    <div key={post.id} className="content-card-16-9">
                    <Link href={`/ebooks/${formatString(post.titre.toLowerCase())}`}>
                        <div className="img-card-16-9">
                            <img src={post.image} alt={post.titre} />
                            <button 
                                style={{ cursor: isInCart ? "inherit" : "pointer" }}
                                className="buy" 
                                onClick={(event) => {
                                    event.preventDefault(); // Empêche la redirection
                                    if (!isInCart) {
                                        addToCart(post.id, post.titre, post.price, post.image);
                                    }
                                }}
                                disabled={isInCart} 
                            >
                                {isInCart ? "Déjà dans le panier" : "Ajouter au panier"}
                            </button>
                            <h2 className="card-price">{post.price} €</h2>
                        </div>
                    </Link>
                    <div className="description-card-16-9">
                        <h2>{post.titre}</h2>
                    </div>
                </div>
                

                );
            })}
        </div>
    </section>
  );
};

export default EbookHome;
