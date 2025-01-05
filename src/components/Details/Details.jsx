"use client";
import { MyContext } from "@/context/Context";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
const Details = ({ posts }) => {
  const { addToCart, checkCart } = useContext(MyContext);
  const isInCart = checkCart(posts.id);
  return (
    <>
      <div className="img-book-detail">
        <div className="img-book">
          <img src={posts.image} alt={posts.title} />
        </div>
      </div>
      <div className="detail-book">
        <div className="container-with-img">
          <div className="img-book">
            <img src={posts.image} alt={posts.title} />
          </div>
          <div className="container-whitout-img">
            <div className="title-detail-book">
              <h1>{posts.titre}</h1>
              <h2>Mrs Cooking</h2>
            </div>
            <div className="price-detail-book">
              <h2>{posts.price} €</h2>
            </div>
            <button
              disabled={isInCart}
              style={{ cursor: isInCart ? "inherit" : "pointer" }}
              onClick={(event) => {
                event.preventDefault();
                if (!isInCart) {
                  addToCart(posts.id, posts.titre, posts.price, posts.image);
                }
              }}
              className="btn-detail-book"
            >
              {isInCart ? "Déjà dans le panier" : "Ajouter au panier"}
            </button>
          </div>
        </div>
        <div className="description-detail-book">
          <h2>Description</h2>
          <ReactMarkdown /* children={data.body} */ rehypePlugins={[rehypeRaw]} >
          {posts.description}
        </ReactMarkdown>
          
        </div>
      </div>
    </>
  );
};
export default Details;
