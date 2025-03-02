import express from "express";
import Stripe from "stripe";
import "dotenv/config";
import nodemailer from "nodemailer";
import books from "../data/books.js";
import axios from "axios";

const router = express.Router();
// Instanciez Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment", async (req, res) => {
  const { amount, email, name, surname, nameCard, address, city, codePostal, country } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: email,
      name: ` ${surname} ${name}  `,
      address: {
        line1: address,
        city: city,
        postal_code: codePostal,
        country: country,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
      customer: customer.id,
    });
    // Envoyez l'ID et le client_secret au frontend
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id, // Ajout de l'ID du PaymentIntent
    });
  } catch (error) {
    console.error("Erreur lors de la création du Payment Intent:", error);
    res.status(500).send({ error: error.message });
  }
});

router.post("/confirm-payment", async (req, res) => {
  const { paymentIntentId,bookIds, email, name, surname, address, city, codePostal, country, products, amount, total, currentTotal, delvery, date, time } = req.body;

  try {
    // Obtenez le PaymentIntent en utilisant l'ID
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {

      function generateTokenForBook(book) {
        // Exemple de génération d'un token unique basé sur l'ID du livre et l'horodatage actuel.
        return `${book.id}-${Date.now()}`;
      }

      //Générer des liens de téléchargement pour chaque livre
      const downloadLinks = bookIds.map((id) => {
        const book = books.find((b) => b.id === id);
        const downloadUrl = `${book.apiEndpoint}?token=${generateTokenForBook(book)}`; // Générer un token unique pour chaque téléchargement
        return `<li><a href="${downloadUrl}" download="${book.titre}.pdf">${book.titre}</a></li>`;
      }).join("");

console.log(downloadLinks)
      /* 
       const attachments = bookIds.map((id) => {
        const book = books.find((b) => b.id === id);
        return {
          filename: `${book.titre}.pdf`,
          path: book.apiEndpoint, // Assurez-vous que pdfPath est défini book.apiEndpoint
          contentType: "application/pdf",
        };
      }); 
 */
      const transporter = nodemailer.createTransport({
        host: "smtp.ionos.fr",
        port: 465, // Port SMTP avec TLS
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Vos ebooks sont disponibles",
        html: `<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mrs Cooking - Recette du mois</title>
  <style>
   

    /* Reset styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background-color: white;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }

    /* Main container */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #fcfcfc;
    }

    /* Header */
    .header {
      background-color: #EFEFEF;
      /* Rouge bordeaux */
      padding: 25px;
      text-align: center;
    }

    .logo {
      max-width: 100px;
      height: auto;
    }

    /* Content */
    .content-block {
      padding: 30px;
      color: #333333;
    }

    .content-block h2 {
      color: #444;
      margin: 40px 0px 10px;
    }

    .content-block p {
      color: #333333
    }

    .box {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      background: #EFEFEF;
      border-radius: 7px;
      margin: 20px 0px 20px;
    }

    .box ul {
      color: #555;
      font-size: 1rem;
      font-weight: 500;
      margin-left: 15px;
      line-height: 2;
    }

    /* Footer */
    .footer {
      background-color: #EFEFEF;
      color: #8E8E8E;
      padding: 20px;
      text-align: center;
      font-size: 12px;
    }

    .footer a {
      color: #FDB913 !important;
      text-decoration: none;
    }

    .img {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
    h4{
      font-size: 0.8rem;
      color: #444;
    }
    h3{
      font-size: 1rem;
      font-weight: 700;
      margin: 10px 0px 10px;
      color: #444;
    }
    .price{
      width: 100%;
      gap: 5px;
     text-align:end;
    }
    li a{
      font-size: 0.9rem;
      color: #FF4D6D;
    }
    li {
      font-size: 0.9rem;
      color: #FF4D6D;
    }
    /* Responsive */
    @media screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }

      .content-block {
        padding: 20px !important;
      }
    }
  </style>
</head>

<body>
  <div class="email-container">
    <!-- En-tête -->
    <div class="header">
      <img src="https://www.mrscooking.com/image/icons/logo.png" alt="Mrs Cooking" class="logo"
        style="display: block; margin: 0 auto;">
    </div>

    <!-- Contenu principal -->
    <div class="content-block">
      <div style=" font-size: 2rem; font-weight: 700; text-align: center;color: #444">
        Merci pour votre achat !
      </div>
      <p style="font-size: 1rem; color: #8E8E8E; text-align: center;">
        Votre commande est disponible dès maintenant !
      </p>

      <h2>Détails de votre commande :</h2>
      <p>
        Cliquez sur <span style=" color: #FF4D6D;">le lien de votre ebook</span> pour le télécharger. Une fois
        téléchargé, extrayez les fichiers pour accéder au PDF.
      </p>
      <div class="box">
        <h3>Vos ebooks :</h3>
        <ul>
         ${downloadLinks}
        </ul>
         <div class="price">
        ${currentTotal != total ? (`<h4>Total : <span style="color:#FF4D6D">${total/100} €</span></h4>
          <h4>Total payé: <span style="color:#FF4D6D">${currentTotal/100} €</span></h4>`) : `<h4>Total payé: <span style="color:#FF4D6D">${total/100} €</span></h4>` }
        </div>
       
      </div>
      
      <div style="color:#8E8E8E">

        <p>Nous vous remercions de votre confiance.</p>
        <p style="margin-top: 15px">Cordialement,<br> <span style="font-weight: 700;"> L'équipe </span></p>
      </div>
    </div>

    <!-- Pied de page -->
    <div class="footer">
      <p style="text-align:center;color:#8E8E8E;">Retrouvez-nous également sur :</p>
      <div style="text-align: center; margin: 15px 0px 15px;">
        <a style="text-decoration: none;" href="https://www.instagram.com/mrs__cooking_/">
          <img class="img"
            src="https://www.mrscooking.com/image/icons/insta.png"
            alt="Instagram" /> </a>
        <a style="text-decoration: none; margin: 0px 15px 0px 15px;" href="https://www.tiktok.com/@mrs__cooking_">
          <img class="img" src="https://www.mrscooking.com/image/icons/tiktok.png" alt="Instagram" /> </a>
        <a style="text-decoration: none;"
          href="https://www.facebook.com/profile.php?id=61566511624992&mibextid=LQQJ4d&rdid=2WMYolaKOL2i5BRG&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18hooAw13c%2F%3Fmibextid%3DLQQJ4d#">
          <img class="img" src="https://www.mrscooking.com/image/icons/fb.png" alt="Instagram" /> </a>
      </div>
      <p>© 2023 Mrs Cooking - Tous droits réservés</p>
    </div>
  </div>
</body>

</html>`,
      };

      await transporter.sendMail(mailOptions);
      console.log("Ebooks envoyé avec succès.");
      res.status(200).send({ message: "Email envoyé avec succès." });
    } else {
      res.status(400).send({ message: "Le paiement a échoué." });
      console.log("Erreur lors de l'envoi des ebboks");
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'ebook:", error);
    res.status(500).send({ error: "Erreur lors de l'envoi de l'ebook." });
  }
});

export default router;
