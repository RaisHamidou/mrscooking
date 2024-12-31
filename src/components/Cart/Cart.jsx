import { MyContext } from "@/context/Context";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

const Cart = ({ display, cartDisplay, setCartDisplay, cart, setCart }) => {
  const [book, setBook] = useState(false);
  const [rafresh, setRafrech] = useState(false);
  const { currentCart, setCurrentCart, total } = useContext(MyContext);
  
  
  const closeCart = () => {
    setCart("translateX(100%)");
    setTimeout(() => {
      setCartDisplay("none");
    }, 1);
  };

  const remove = (id) => {
    const updatedProducts = currentCart.filter((item) => item.id !== id);
    setCurrentCart(updatedProducts);
    localStorage.setItem("book", JSON.stringify(updatedProducts));
    setRafrech(!rafresh);
  };

  useEffect(() => {
    if (currentCart.length > 0) {
      setBook(true);
    } else {
      setBook(false);
    }
  }, [currentCart]);

  return (
    <section style={display} className="Cart">
      <div onClick={() => setCartDisplay("none")} className="cart-overlay" />
      <div style={{ transform: cart }} className="container-cart">
        <div className="cart-head">
          <h1>Votre panier</h1>
          <div onClick={closeCart} className="close-cart">
            <FaXmark />
          </div>
        </div>
        {!book && (
          <div className="empty-cart">
            <h2>Votre panier est vide</h2>
          </div>
        )}
        {book && (
          <>
            {currentCart != null
              ? currentCart.map((post) => {
                  return (
                    <div key={post.id}>
                      <div className="product-added">
                        <div className="img-product-added">
                          <img src={post.img} alt="" />
                        </div>
                        <div className="product-info">
                          <div className="title-product">
                            <h2>{post.title}</h2>
                          </div>
                          <div className="containter-price">
                            <div>Prix :</div>
                            <div>{post.price} €</div>
                          </div>
                          <div onClick={()=>remove(post.id)} className="delete">Retiré du panier</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
            <div className="containter-total-price">
              <div className="total">Total</div>
              <div className="price">{`${total} €`}</div>
            </div>
            <Link href="/checkout">
              <div className="btn-buy">Confirmer la commande</div>
            </Link>
            
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
