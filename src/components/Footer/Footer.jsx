import React from "react";
import { FaTiktok,FaInstagram,FaFacebook, FaT } from "react-icons/fa6";
import logo from "@/assets/svg/logo/logo.svg"
const Footer = () => {
  return (
  <footer>
    <div className="container-footer">
        <div className="footer-logo"><a href="/"><img src={logo.src} alt="" /></a></div>

        <nav className="social-links">
            <h3>Get In Touch</h3>
            <p>Retrouvez-nous également sur nos réseaux sociaux !</p>
            <ul>
                <li><a href="#"><FaInstagram /></a></li>
                <li><a href="#"><FaFacebook /></a></li>
                <li><a href="#"><FaTiktok /></a></li>
            </ul>
        </nav>
        <nav className="conditions">
            <h3>Conditions</h3>
            <ul>
                <li><a href="#">Mention Legal</a></li>
                <li><a href="#">Condition général d’utilisation</a></li>
                <li><a href="#">Condition général de vente</a></li>
                <li><a href="#">politique des cookies</a></li>
            </ul>
        </nav>
        <nav className="informaion">
            <h3>Informations</h3>
            <ul>
                <li><a href="#">A propos de nous</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </div>
    <div className="copyright">
        <p>&copy;Made with love by <a href="https://numidian.dev">numidian.dev</a> All Right
            Reserved</p>
    </div>
</footer>
);
};

export default Footer