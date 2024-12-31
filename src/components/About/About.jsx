import React from "react";
import about from "../../assets/about/KwpWMvriwKX.png";
import { FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa6";

const About = () => {
  return (
    <section id="about">
      <div className="about-img">
        <img src={about.src} alt="about" />
      </div>
      <div className="container-info-about">
        <h1>Qui suis-je ?</h1>
        <div className="about-social">
          <ul>
            <li><a href=""><FaInstagram /></a></li>
            <li><a href=""><FaFacebook /></a></li>
            <li><a href=""><FaTiktok /></a></li>
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
