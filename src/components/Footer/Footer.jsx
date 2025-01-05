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
                <li><a href="https://www.instagram.com/mrs__cooking_/?fbclid=IwZXh0bgNhZW0CMTAAAR0g3-HICPYh_n3I7nDEt0HzwKRyVaIxWhal3E2Lz__ZWLai2_j0PGkC3SE_aem_8eY5satE9VDlc6CtGr2ptQ"><FaInstagram /></a></li>
                <li><a href="https://www.facebook.com/profile.php?id=61566511624992&mibextid=LQQJ4d&rdid=2WMYolaKOL2i5BRG&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18hooAw13c%2F%3Fmibextid%3DLQQJ4d#"><FaFacebook /></a></li>
                <li><a href="https://www.tiktok.com/@mrs__cooking_?_t=ZN-8snJRXUdJjS&_r=1&fbclid=IwZXh0bgNhZW0CMTAAAR0g3-HICPYh_n3I7nDEt0HzwKRyVaIxWhal3E2Lz__ZWLai2_j0PGkC3SE_aem_8eY5satE9VDlc6CtGr2ptQ"><FaTiktok /></a></li>
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