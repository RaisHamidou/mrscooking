"use client";
import { MyContext } from "@/context/Context";
import Link from "next/link";
import React, { useContext } from "react";

const Cards = ({ array }) => {
    const { addToCart, checkCart } = useContext(MyContext);

    const formatString = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase();
    };

    if (!Array.isArray(array)) {
        return <p>Aucune donnée à afficher</p>;
    }

    return (
        <div className="container-cards-16-9">
            {array.map((post) => {
                const isInCart = checkCart(post.id);

                return (
                    <div key={post.id} className="content-card-16-9">
                        <Link href={`/ebooks/${formatString(post.titre)}`}>
                            <div className="img-card-16-9">
                                <img src={post.image} alt={post.titre} />
                                <h2 className="card-price">{post.price} €</h2>
                                <button
                            style={{ cursor: isInCart ? "inherit" : "pointer" }}
                            className="buy"
                            onClick={(e) => {
                                e.preventDefault()
                                if (!isInCart) {
                                    addToCart(post.id, post.titre, post.price, post.image);
                                }
                            }}
                            disabled={isInCart}
                            aria-disabled={isInCart}
                            aria-label={isInCart ? "Article déjà dans le panier" : "Ajouter au panier"}
                        >
                            {isInCart ? "Déjà dans le panier" : "Ajouter au panier"}
                        </button>
                            </div>
                           
                        </Link>
                      
                        <div className="description-card-16-9">
                            <h2>{post.titre}</h2>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Cards;
