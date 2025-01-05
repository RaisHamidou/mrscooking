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
        <p className="info-about">
        Passionnée de cuisine, je te partage mes réalisations culinaires depuis maintenant des années. 
        Soucieuse de toujours bien faire, je ne cesse de perfectionner mes recettes afin de te
        proposer mes réalisations les plus goûteuses.<br/>
        Aujourd’hui, c’est avec grand plaisir que je souhaite te faire découvrir mon univers à travers mes e-bookes rempli de douceur.
        Certaines me connaissent à travers les plats réalisés pour mon mari. Il a su être conquis, c’est la raison pour laquelle je souhaite te faire découvrir cet univers culinaire et te permettre à toi aussi d’exceller dans le domaine.
        À travers la diversité de mes e-books, tu pourras voyager et découvrir diverses spécialités.
        N’hésite plus, mets ton tablier et régale-toi ! 
        </p>
       
      </div>
      
    </section>
  );
};

export default About;
