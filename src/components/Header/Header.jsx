"use client";
import React, { useContext, useEffect, useState } from "react";
import openMenu from "./../../assets/svg/Hamb.svg";
import cartImg from "./../../assets/svg/cart.svg"
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import Cart from "../Cart/Cart";
import { usePathname } from "next/navigation";
import { MyContext } from "@/context/Context";
import logo from "@/assets/svg/logo/logo.svg"
const Header = () => {
  const [displayState, setDisplayState] = useState();
  const [cartDisplay, setCartDisplay] = useState("none");
  const [cart, setCart] = useState("translate(100%)");
  const {currentCart} = useContext(MyContext)
  
  const display = { transform: displayState };
  const pathName = usePathname()
  const openCart = ()=>{
    setCartDisplay("block")
    setTimeout(() => {
        setCart("translate(0%)")
    }, 0.5); 
}



  useEffect(() => {
    const body = document.body;
    const openMenu = document.getElementsByClassName("openMenu")[0];
    const closeMenu = document.getElementsByClassName("closeMenu")[0];

    if (displayState === "translateX(0%)") {
      body.style.overflow = "hidden";
      openMenu.style.display = "none";
      closeMenu.style.display = "block";
    } else {
      body.style.overflow = "auto";
      openMenu.style.display = "";
      closeMenu.style.display = "none";
    }
  }, [display]);

 /*  useEffect(()=>{
    const body = document.body;
    const cart = document.getElementById("Cart")
    if(cartDisplay === "block"){
      body.style.overflow = "hidden";

    }else{
      body.style.overflow = "auto";
      
    }
    
  },[cartDisplay]) */
  return (
    <>
    <header>
      <div onClick={() => setDisplayState("translateX(0%)")} className="openMenu">
        <img src={openMenu.src} />
      </div>
      <div onClick={() => setDisplayState("translateX(-100%)")} className="closeMenu">
        <FaXmark />
      </div>
      <div className="logo"><a href="/"><img src={logo.src} alt="logo" /></a></div>
      <nav style={display} className="mainMenu">
        <ul className="menu">
          <li className={pathName === "/" ? "active":""}> <a href="/">Accueil</a></li>
          <li className={pathName.includes("/ebooks") ? "active":""}><a href="/ebooks">Ebooks</a></li>
          <li className={pathName === "/about" ? "active":""}><a href="/#about">About</a></li>
          <li className={pathName === "/contact" ? "active":""}><a href="/contact">Contact</a></li>
        </ul>
      </nav>
       <div onClick={openCart} className="cart">
        <img src={cartImg.src}/>
        {currentCart.length > 0 ? 
        <div className="cart-number">{currentCart.length}</div>
        : null}
      </div>
     
      
    </header>
    <Cart display={{display: cartDisplay}} setCartDisplay={setCartDisplay} cart={cart} setCart={setCart} />
    </>
  );
};
export default Header;
