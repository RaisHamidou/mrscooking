import express from "express";
import Stripe from "stripe";
import "dotenv/config";
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';
import path from 'path';
import books from "../data/books.js";
import rateLimit from 'express-rate-limit';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Configuration du rate limiter
const downloadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10 // limite à 10 tentatives
});

// Fonction pour générer un token sécurisé
const generateSecureToken = (bookId, userId, paymentIntentId) => {
  return jwt.sign({
    bookId,
    userId,
    paymentIntentId,
    iat: Date.now(),
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 heures
  }, process.env.JWT_SECRET);
};

// Middleware de vérification du token
const verifyToken = (req, res, next) => {
  const token = req.query.token;
  
  if (!token) {
    return res.status(403).send('Accès non autorisé');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.downloadInfo = decoded;
    next();
  } catch (error) {
    return res.status(403).send('Token invalide ou expiré');
  }
};

// Route de création du paiement (inchangée)
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

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Erreur lors de la création du Payment Intent:", error);
    res.status(500).send({ error: error.message });
  }
});

// Route de confirmation du paiement modifiée
router.post("/confirm-payment", async (req, res) => {
  const { paymentIntentId, email, bookIds } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      // Générer des liens de téléchargement sécurisés
      const downloadLinks = bookIds.map((id) => {
        const book = books.find((b) => b.id === id);
        const token = generateSecureToken(book.id, email, paymentIntentId);
        const downloadUrl = `${process.env.API_BASE_URL}/api/book/download/${book.id}?token=${token}`;
        return `<li><a href="${downloadUrl}">${book.titre}</a></li>`;
      }).join("");

      const transporter = nodemailer.createTransport({
        host: "smtp.ionos.fr",
        port: 465,
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
          <!-- Votre HTML existant -->
          <div style="width:100%; padding:10px; box-sizing: border-box; background:#F1E3D4;border-radius:7px">
            <ul style="color: #555; font-size: 1rem; width:50%; font-weight:500;">
              ${downloadLinks}
            </ul>
          </div>
          <!-- Reste de votre HTML -->
        </main>`
      };

      await transporter.sendMail(mailOptions);
      res.status(200).send({ message: "Email envoyé avec succès." });
    } else {
      res.status(400).send({ message: "Le paiement a échoué." });
    }
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).send({ error: "Erreur lors de l'envoi." });
  }
});

// Nouvelle route pour le téléchargement sécurisé
router.get("/download/:bookId", downloadLimiter, verifyToken, async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = books.find(b => b.id === parseInt(bookId));

    if (!book) {
      return res.status(404).send('Livre non trouvé');
    }

    // Chemin vers le fichier (à ajuster selon votre structure)
    const filePath = path.join(process.env.EBOOKS_DIRECTORY, `${book.titre}.pdf`);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${book.titre}.pdf"`);
    
    res.sendFile(filePath);

  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    res.status(500).send('Erreur lors du téléchargement');
  }
});

export default router;