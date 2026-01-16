import React from "react";
import about from "../../assets/about/KwpWMvriwKX.png";
import { FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa6";
import logo from "@/assets/svg/logo/logo.svg"
const About = () => {
  return (
    <section id="about">
      <div className="about-img">
        <img src={logo.src} alt="about" />
      </div>
      <div className="container-info-about">
        <h1>Qui suis-je ?</h1>
        <div className="about-social">
          <ul>
            <li><a href="https://www.instagram.com/mrs__cooking_/?fbclid=IwZXh0bgNhZW0CMTAAAR0g3-HICPYh_n3I7nDEt0HzwKRyVaIxWhal3E2Lz__ZWLai2_j0PGkC3SE_aem_8eY5satE9VDlc6CtGr2ptQ"><FaInstagram /></a></li>
            <li><a href="https://www.facebook.com/profile.php?id=61566511624992&mibextid=LQQJ4d&rdid=2WMYolaKOL2i5BRG&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18hooAw13c%2F%3Fmibextid%3DLQQJ4d#"><FaFacebook /></a></li>
            <li><a href="https://www.tiktok.com/@mrs__cooking_?_t=ZN-8snJRXUdJjS&_r=1&fbclid=IwZXh0bgNhZW0CMTAAAR0g3-HICPYh_n3I7nDEt0HzwKRyVaIxWhal3E2Lz__ZWLai2_j0PGkC3SE_aem_8eY5satE9VDlc6CtGr2ptQ"><FaTiktok /></a></li>
          </ul>
        </div>
        <article className="info-about">
        <p>Passionnée de cuisine depuis de nombreuses années, je partage mes réalisations 
        culinaires avec l’envie constante de bien faire et de toujours m’améliorer. 
        Chaque recette est pensée, testée et perfectionnée afin de te proposer 
        des plats savoureux, accessibles et riches en goût.</p> <br/>

        <p>À travers mes e-books, je t’invite à découvrir mon univers 
        gourmand, empreint de douceur et de générosité. Certaines me 
        connaissent déjà à travers les plats que je prépare pour mon 
        mari, premier et fidèle gourmet, conquis depuis longtemps. 
        C’est cette passion et ce plaisir de cuisiner que je souhaite 
        aujourd’hui partager avec toi.</p> <br/>

        <p>Grâce à la diversité de mes e-books, tu pourras voyager à travers différentes 
        saveurs et spécialités, tout en prenant confiance en cuisine. Ici, pas de pression : 
        seulement l’envie de se faire plaisir et de régaler ceux qu’on aime.</p> <br/>
        
        <p>Alors n’hésite plus, enfile ton tablier et laisse-toi guider 🍽️✨</p>
        </article>
       
      </div>
      
    </section>
  );
};

export default About;
