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
  const { paymentIntentId, email, bookIds } = req.body;

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
        const downloadUrl = `${book.apiEndpoint}`; // Générer un token unique pour chaque téléchargement
        return `<li><a href="${downloadUrl}" download="${book.titre}.zip">${book.titre}</a></li>`;
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
        html: `<main style="background:#f5F5F5;padding:50px">
  <div style="margin:auto;background: #F7EDE2; width: 90%; border-radius: 7px; font-family: 'Poppins', sans-serif;">
          <div style="padding: 30px;box-sizing: border-box;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://www.mrscooking.com/image/icons/logo.png" alt="Logo" style="max-width: 150px;" />
            </div>
            <div style="color: #white; font-size: 2rem; font-weight: 700; text-align: center;">
              Merci pour votre achat !
            </div>
            <p style="font-size: 1rem; color: #8E8E8E; text-align: center;">
              Votre commande est disponible dès maintenant !
            </p>
      
            <h2 style="color: #444;">Détails de votre commande :</h2>
            <div style="width:100%; padding:10px; box-sizing: border-box ; background:#F1E3D4;border-radius:7px">
              <ul style="color: #555; font-size: 1rem; width:50%; font-weight:500;">
                ${downloadLinks}
              </ul>
            </div>
            <div style="color:#8E8E8E">
              <p>Vous pouvez télécharger vos ebooks en cliquant sur les liens ci-dessus.</p>
              <p>Nous vous remercions de votre confiance.</p>
              <p>Cordialement,<br> <span style="font-weight: 700;"> L'équipe </span></p>
            </div>
          </div>
          <footer style="width:100%; box-sizing: border-box;background:#F1E3D4;padding:20px">
            <p style="text-align:center;color:#8E8E8E;">Retrouvez-nous également sur :</p>
            <div style="text-align: center; margin-top: 20px;">
             <a style="text-decoration: none;" href="https://www.instagram.com/mrs__cooking_/">
              <img style="width:25px;height:25px;object-fit:contain" src="https://www.mrscooking.com/image/icons/insta.png" alt="Instagram" /> </a>
              <a style="text-decoration: none;" href="https://www.tiktok.com/@mrs__cooking_">
              <img style="width:25px;height:25px;object-fit:contain" src="https://www.mrscooking.com/image/icons/tiktok.png" alt="Instagram" /> </a>
              <a style="text-decoration: none;"href="https://www.facebook.com/profile.php?id=61566511624992&mibextid=LQQJ4d&rdid=2WMYolaKOL2i5BRG&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18hooAw13c%2F%3Fmibextid%3DLQQJ4d#">
              <img style="width:25px;height:25px;object-fit:contain" src="https://www.mrscooking.com/image/icons/fb.png" alt="Instagram" /> </a>
            </div>
          </footer>
        </div>
</main>`,
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