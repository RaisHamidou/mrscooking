import express from "express";
import Stripe from "stripe";
import "dotenv/config";
import nodemailer from "nodemailer";




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
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log("Produits reçus :", products);
    if (paymentIntent.status === "succeeded") {
      const ebooks = products.filter((p) => p.type === "ebook");
      const physiques = products.filter((p) => p.type === "physique");

      const transporter = nodemailer.createTransport({
        host: "smtp.ionos.fr",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      if(ebooks.length > 0 && physiques.length >0){
        const downloadLinks = bookIds.map((id) => {
          const book = ebooks.find((b) => b.id === id);
          if (!book) {
            console.error(`Aucun ebook trouvé avec l'ID : ${id}`);
            return "";
          }
          const downloadUrl = `${book.endpoint}`;
          return `<li style="color:#FF4D6D"><a style="color:#FF4D6D; font-size: 0.9rem" href="${downloadUrl}" download="${book.title}.pdf">${book.title}</a></li>`;
        }).join("");

        const productList = physiques.map((p) => `<li style="color:#FF4D6D">${p.title}</li>`).join("");
        

        const mailClient = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Confirmation de votre commande",
          html:`
            <!DOCTYPE html>
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
      <div style=" font-size: 2rem; font-weight: 700; text-align: center;">
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
        <h3>Votre commandes de gâteau :</h3>
        <ul>
         ${productList}
        </ul>
        <div class="price">
        ${currentTotal != total ? (`<h4>Total : <span style="color:#FF4D6D">${total/100} €</span></h4>
          <h4>Total payé: <span style="color:#FF4D6D">${currentTotal/100} €</span></h4>`) : `<h4>Total payé: <span style="color:#FF4D6D">${total} €</span></h4>` }
        </div>
      </div>
      <div>
        <h3>Rappel de votre rendez-vous et information</h3>
        <p><strong>Vous venez le </strong> <span style="color:#FF4D6D">${date}</span> <strong>à</strong> 
          <span style="color:#FF4D6D">${time}</span>
        </p>
        <p><strong>À l'adresse suivante :</strong> <span style="color:#FF4D6D">44 rue des longues raies 75013 paris</span></p>
         <p> <strong>Information que vous nous avez précisez:</strong> <span style="color:#FF4D6D">${delvery === undefined ? "aucune précision":delvery}</span></p><br>
        <p>Vous recevrez prochainement un email confirmant votre rendez-vous et le début de la préparation de votre commande de gâteau.</p> <br>

          <p>Veuillez noter qu’après le début de la préparation de votre commande, aucun remboursement ne pourra être effectué.</p><br>
          
          <p>Si vous souhaitez un remboursement ou modifier la date de votre commande avant son commencement, veuillez nous contacter par email à l’adresse suivante : <span style="color:#FF4D6D">contact@mrscooking.com</span>.</p><br>
        
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

</html>
          `
        }
        const mailAdmin = {
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL, 
          subject: "Commande de gâteau",
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
        Récapitulatif de la commande du client : ${surname} ${name}
      </p>
      <div class="box">
        <h3>Votre commandes de gâteau :</h3>
        <ul>
            ${productList}
        </ul>
         <div class="price">
        ${currentTotal != total ? (`<h4>Total : <span style="color:#FF4D6D">${total/100} €</span></h4>
          <h4>Total payé: <span style="color:#FF4D6D">${currentTotal/100} €</span></h4>`) : `<h4>Total payé: <span style="color:#FF4D6D">${total} €</span></h4>` }
        </div>
       
      </div>
      <div>
        <h3>Rappel de son rendez-vous et information</h3>
        <p><strong>Il vient le </strong> <span style="color:#FF4D6D">${date}</span> <strong>à</strong> 
          <span style="color:#FF4D6D">${time}</span>
        </p>
        <p><strong>À l'adresse suivante :</strong> <span style="color:#FF4D6D">44 rue des longues raies 75013 paris</span> </p>
        <p> <strong>Information qu'il a préciser:</strong>  <span style="color:#FF4D6D">${delvery === undefined ? "aucune précision":delvery}</span></p><br>
        <p> Il faut envoyer un mail de confirmation de commande et de rendez-vous a l'adresse mail suivante : <span style="color:#FF4D6D">${email}</span>.</p><br>
        
        
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

        await transporter.sendMail(mailClient);
        await transporter.sendMail(mailAdmin);
        console.log("Email ebooks et gateau envoyé au client.");
      }

      // 📩 1️⃣ Email pour les ebooks (si achetés)
      if (ebooks.length > 0 && physiques.length === 0) {
        const downloadLinks = bookIds.map((id) => {
          const book = ebooks.find((b) => b.id === id);
          if (!book) {
            console.error(`Aucun ebook trouvé avec l'ID : ${id}`);
            return "";
          }
          const downloadUrl = `${book.endpoint}`;
          return `<li><a style="color:#FF4D6D; font-size: 0.9rem" href="${downloadUrl}" download="${book.title}.pdf">${book.title}</a></li>`;
        }).join("");

        const mailClient = {
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
        try {
          await transporter.sendMail(mailClient);
          console.log("Email envoyé au client.");
        } catch (error) {
          console.error("Erreur lors de l'envoi de l'email au client:", error);
        }
       /*  await transporter.sendMail(mailClient);
        console.log("Email ebooks envoyé au client."); */
      }

      // 📩 2️⃣ Email pour l'admin (détails de la commande)
      if (physiques.length > 0 && ebooks.length ===0) {
        const productList = physiques.map((p) => `<li>${p.title} - ${p.price}€</li>`).join("");

        const mailAdmin = {
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL, 
          subject: "Commande de gâteau",
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
        Récapitulatif de la commande du client : ${surname} ${name}
      </p>
      <div class="box">
        <h3>Votre commandes de gâteau :</h3>
        <ul>
            ${productList}
        </ul>
        <div class="price">
        ${currentTotal != total ? (`<h4>Total : <span style="color:#FF4D6D">${total/100} €</span></h4>
          <h4>Total payé: <span style="color:#FF4D6D">${currentTotal/100} €</span></h4>`) : `<h4>Total payé: <span style="color:#FF4D6D">${total} €</span></h4>` }
        </div>
       
      </div>
      <div>
        <h3>Rappel de son rendez-vous et information</h3>
        <p><strong>Il vient le </strong> <span style="color:#FF4D6D">${date}</span> <strong>à</strong> 
          <span style="color:#FF4D6D">${time}</span>
        </p>
        <p><strong>À l'adresse suivante :</strong> <span style="color:#FF4D6D">44 rue des longues raies 75013 paris</span> </p>
        <p> <strong>Information qu'il a préciser:</strong>  <span style="color:#FF4D6D">${delvery === undefined ? "aucune précision":delvery}</span></p><br>
        <p> Il faut envoyer un mail de confirmation de commande et de rendez-vous a l'adresse mail suivante : <span style="color:#FF4D6D">${email}</span>.</p><br>
        
        
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
        const mailClient = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Confirmation de votre commande",
          html:`
            <!DOCTYPE html>
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
      <div style=" font-size: 2rem; font-weight: 700; text-align: center;">
        Merci pour votre achat !
      </div>
      <p style="font-size: 1rem; color: #8E8E8E; text-align: center;">
        Votre commande est disponible dès maintenant !
      </p>

      <h2>Détails de votre commande :</h2>
      <p>
        Retrouvez ci-dessous un récapitulatif de votre commande
      </p>
      <div class="box">
        <h3>Votre commandes de gâteau :</h3>
        <ul>
         ${productList}
        </ul>
         <div class="price">
        ${currentTotal != total ? (`<h4>Total : <span style="color:#FF4D6D">${total/100} €</span></h4>
          <h4>Total payé: <span style="color:#FF4D6D">${currentTotal/100} €</span></h4>`) : `<h4>Total payé: <span style="color:#FF4D6D">${total} €</span></h4>` }
        </div>
      </div>
      <div>
        <h3>Rappel de votre rendez-vous et information</h3>
        <p><strong>Vous venez le </strong> <span style="color:#FF4D6D">${date}</span> <strong>à</strong> 
          <span style="color:#FF4D6D">${time}</span>
        </p>
        <p><strong>À l'adresse suivante :</strong> <span style="color:#FF4D6D">44 rue des longues raies 75013 paris</span></p>
         <p> <strong>Information que vous nous avez précisez:</strong> <span style="color:#FF4D6D">${delvery === undefined ? "aucune précision":delvery}</span></p><br>
        <p>Vous recevrez prochainement un email confirmant votre rendez-vous et le début de la préparation de votre commande de gâteau.</p> <br>

          <p>Veuillez noter qu’après le début de la préparation de votre commande, aucun remboursement ne pourra être effectué.</p><br>
          
          <p>Si vous souhaitez un remboursement ou modifier la date de votre commande avant son commencement, veuillez nous contacter par email à l’adresse suivante : <span style="color:#FF4D6D">contact@mrscooking.com</span>.</p><br>
        
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

</html>
          `
        }

        await transporter.sendMail(mailAdmin);
        console.log("Email de commande physique envoyé à l'admin.");
        await transporter.sendMail(mailClient);
        console.log("Email de commande physique envoyé au client.");
      }

      res.status(200).send({ message: "Paiement confirmé et emails envoyés." });
    } else {
      res.status(400).send({ message: "Le paiement a échoué." });
    }
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).send({ error: "Erreur lors du traitement de la commande." });
  }
});



export default router;