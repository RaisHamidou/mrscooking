"use client"
import { useContext, useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Cards from "@/components/Cards/Cards";
import { MyContext } from "@/context/Context";
import axios from "axios";
import Link from "next/link";

const EbookHome  = ({URL}) => {
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
    .trim() 
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}
  return (
    <section id="ebooks">
      <div className="books-page-hero">
        <h1>Mes derniers ebooks</h1>
      </div>
      <div className="container-ebooks">

      <div className="container-cards-16-9">
            {books&&books.sort((a,b)=>b.id - a.id).slice(0,4).map((post) => {
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
                            <h2 className="card-price">{new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(post.price / 100)}</h2>
                        </div>
                    </Link>
                    <div className="description-card-16-9">
                        <h2>{post.titre}</h2>
                    </div>
                </div>
                

                );
            })}
        </div>
      </div>

    </section>
  );
};

export default EbookHome;
