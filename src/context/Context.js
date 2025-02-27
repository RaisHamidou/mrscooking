"use client"


import { usePromoCode } from "@/components/promo/PromoCode";
import axios from "axios";
import React,{createContext, useState, useEffect} from "react";

 

export const MyContext = createContext();
 const MyContextProvider = ({children})=>{
    const [currentCart, setCurrentCart] = useState([]);
    const [refrech, setRefrech] = useState(false);
    const [promo, setPromo] = useState()
    const [promoCodes, setPromoCodes] = useState()




    useEffect(()=>{
      const promoLoad = async ()=>{
        const res = await axios.get(`https://www.mrscooking.com/api/promo`)
        setPromoCodes(res.data)
      }
      promoLoad()
    },[])
    const promoValue = (1-0.1)
    const isPromoValid = promo && promoCodes && promoCodes.includes(promo);

     
    useEffect(() => {
        const storedCart = localStorage.getItem("book");
        if (storedCart) {
          setCurrentCart(JSON.parse(storedCart));
        }
      }, []);

      const addToCart = (id, title,price,img,type,endpoint)=>{
        const newCommande = {id,title,price,img,type, endpoint}
        const updatedcart = [...currentCart,newCommande]
        setCurrentCart(updatedcart)
        localStorage.setItem("book",JSON.stringify(updatedcart))
        setRefrech(!refrech)
      }

     const checkCart = (title) => {
      const bookInCart = currentCart.some((book) => book.title === title); // Comparer book.titre avec le title passé
      return bookInCart; // retourne true si le livre est trouvé dans le panier, sinon false
    };

      const total = currentCart.reduce((acc, item) => acc + Number(item.price), 0);
      //const total = (totalInCentime / 100).toFixed(2);
      const [price, setPrice] =useState(total)
      const clearCart = () => {
        setCurrentCart([]); // Vider le panier dans l'état
        localStorage.removeItem("book"); // Supprimer les données du panier du stockage local
        setRefrech(!refrech); // Actualiser si nécessaire
      };

      
      useEffect(() => {
        const checkPromoCode = () => {
          if (promoCodes && promoCodes.includes(promo)) {
            const discountedPrice = Math.round(total * 0.9); // Réduit de 10% et arrondit à l'entier
            setPrice(discountedPrice);
          } else {
            setPrice(total);
          }
        };
        
        checkPromoCode();
      }, [total, promoCodes, promo]); // Enlève price des dépendances
  
    return(
        <MyContext.Provider value={{currentCart, setCurrentCart, addToCart, checkCart, total, clearCart, price, setPromo,promo,isPromoValid}}>
            {children}
        </MyContext.Provider>
    )
}
export default MyContextProvider;