"use client";
import { MyContext } from "@/context/Context";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import EmblaCarousel from "../BooksImages/EmblaCarousel";
const Details = ({ posts }) => {
  const [toggleState, setToggleState] = useState(0)
    const toggleTab = (index)=>{
        setToggleState(index)
    }
    console.log(toggleState)
  const { addToCart, checkCart } = useContext(MyContext);
  const isInCart = checkCart(posts.id);
  return (
    <>
     <section className="details-page">
      <div className="Container-details-img">
        <div className="details-img">
        <img src={posts.image_books[toggleState]} alt={posts.title} /> 
        </div>
      <EmblaCarousel posts={posts.image_books} alt={posts.title} toggleTab={toggleTab}  />
      </div>

      <div className="container-details">
      <div className="detail-book">
      
          <div className="container-whitout-img">
            <div className="title-detail-book">
              <h1>{posts.titre}</h1>
              <h2>Mrs Cooking</h2>
            </div>
            <div className="price-detail-book">
  <h2>
    {new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(posts.price / 100)}
  </h2>
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
        
      <div className="description-detail-book">
          <h2>Description</h2>
          <ReactMarkdown rehypePlugins={[rehypeRaw]} >
          {posts.description}
        </ReactMarkdown>
          
        </div>
        </div>
      </div>
    
    </section>
      
     {/*  */}
    </>
  );
};
export default Details;
