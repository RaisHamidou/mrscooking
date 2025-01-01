import express from "express";
import Stripe from "stripe";
import "dotenv/config";
import nodemailer from "nodemailer";
import books from "../data/books.js";

const router = express.Router();
// Instanciez Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment", async (req, res) => {
  try {
    const { amount } = req.body; // Récupérez le montant du corps de la requête
    // Créez le Payment Intent avec le montant et la devise
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
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
      const attachments = bookIds.map((id) => {
        const book = books.find((b) => b.id === id);
        return {
          filename: `${book.titre}.pdf`,
          path: book.apiEndpoint, // Assurez-vous que pdfPath est défini book.apiEndpoint
          contentType: "application/pdf",
        };
      });

     
      const transporter = nodemailer.createTransport({
        host: "smtp.ionos.fr",
        port: 465,  // Port SMTP avec TLS
        secure: true,
        auth: {
          user: "contact@mrscooking.com",
          pass: "boumerdes2984"
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Vos ebooks sont disponibles',
        text: 'Merci pour votre achat. Vous trouverez vos ebooks en pièce jointe.',
        html: `<div style="background: #F5F5F5; width: 90%; border-radius: 7px; font-family: 'Poppins', sans-serif;">
          <div style="padding: 30px;box-sizing: border-box;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://example.com/logo.png" alt="Logo" style="max-width: 150px;" />
            </div>
            <div style="color: #FF4D6D; font-size: 2rem; font-weight: 700; text-align: center;">
              Merci pour votre achat !
            </div>
            <p style="font-size: 1rem; color: #8E8E8E; text-align: center;">
              Votre commande est disponible dès maintenant !
            </p>
      
            <h2 style="color: #444;">Détails de votre commande :</h2>
            <div style="width:100%; padding:10px; box-sizing: border-box ; background:#D9D9D9;border-radius:7px">
              <ul style="color: #555; font-size: 1rem; width:50%; font-weight:500;">
                ${bookIds.map((id) => {
                  const book = books.find((b) => b.id === id);
                  return `<li>${book.titre}</li>`;
                }).join('')}
              </ul>
            </div>
            <div style="color:#8E8E8E">
              <p>Vous trouverez <span style="color: #FF4D6D;">
                  en pièce jointe </span> les fichiers correspondants à votre commande. </p>
              <p>Nous vous remercions de votre confiance.</p>
              <p>Cordialement,<br> <span style="font-weight: 700;"> L'équipe </span></p>
            </div>
          </div>
          <footer style="width:100%; box-sizing: border-box;background:#D9D9D9;padding:20px">
            <p style="text-align:center;color:#8E8E8E;">Retrouvez-nous également sur :</p>
            <div style="text-align: center; margin-top: 20px;">
              <img src="https://example.com/icons/insta.png" alt="Instagram" />
            </div>
          </footer>
        </div>`,
        attachments: attachments,
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
