import Link from 'next/link';
import React from 'react';
import { FaInstagram } from "react-icons/fa6";

const Contact = () => {
    return (
        <section className="container-form">
            <div className="title-section">
                <h1>Des questions ?</h1>
            </div>
            <form id="contact" action="#" method="POST">
                <div className="container-input">
                    <input type="text" name="name" id="name" placeholder="Nom" />
                    <input type="email" name="email" id="email" placeholder="Email" />
                </div>
                <textarea name="message" id="message" placeholder="Message"></textarea>
                <input type="submit" id="submit" value="Envoyer" />
                <div className="insta-contact">
                    <p>Pour une réponse plus rapide vous pouvez également nous contacter sur Instagram</p>
                    <Link href="#" target="_blank">
                        <FaInstagram />
                    </Link>
                </div>
            </form>
        </section>
    );
}

export default Contact;