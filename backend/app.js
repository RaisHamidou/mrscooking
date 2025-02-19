import express from "express"
import cors from "cors"
import "dotenv/config";
import paymentRoute from "./api/payment.js"
import Databooks from "./data/books.js"
import bookRouter from "./api/book.js"
import legalData from "./data/legals.js";
import axios from "axios";
import cakes from "./data/cakes.js";

const app = express()


app.use(cors());
app.use(express.json())

const PASSWORD = process.env.PASSWORD

// Middleware de vérification du token
function verifyAccessToken(req, res, next) {
    const token = req.query.token; // Récupérer le token depuis l'URL
    if (!token) {
      return res.status(403).json({ message: 'Access denied. No token provided.' });
    }
    if (token !== process.env.BOOK_TOKEN) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    next(); // Le token est valide, on passe à la route suivante
  }
  


  // Utiliser le middleware et le router
  app.use("/api/book", bookRouter);
  


app.use("/api/payment",paymentRoute)



app.get('/api/books', (req, res) => {
/*       const auth = req.headers.authorization;
    if (auth && auth === PASSWORD) {  */
        res.json(Databooks);
    /* } else {
        res.status(401).json({ message: 'Accès interdit.' });
    }  */ 
  
});
app.get('/api/cakes', (req, res) => {
  const auth = req.headers.authorization;
if (auth && auth === PASSWORD) { 
    res.json(cakes);
} else {
    res.status(401).json({ message: 'Accès interdit.' });
}  

});

function formatString(str) {
    return str
        .normalize("NFD") // Décompose les caractères accentués en caractères de base et leurs diacritiques
        .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques (accents)
        .replace(/\s+/g, "-") // Remplace les espaces par des tirets
        .replace(/['’]/g, "-")
        .toLowerCase(); // Convertit la chaîne en minuscules
}
app.get("/api/books/:title", (req, res) => {
    const params = req.params.title.toLowerCase();

    const auth = req.headers.authorization
    const data = Databooks.filter(book => formatString(book.titre) === params);
    
    
    if(auth && auth === PASSWORD){
        res.json(data[0]);
    }else{
        res.status(401).json({ message: 'Accès interdit.' })
    }
});

app.get("/api/legals/:id", (req,res)=>{
   const params = req.params.id.toLowerCase()
   const data = legalData.filter(data => formatString(data.title) === params)
   res.json(data[0])
})

app.get("/api/legals", (req,res)=>{
 
  res.json(legalData)
})

app.get("/api/promo", (req,res)=>{
  const data = [process.env.PROMO,
    process.env.PROMO_RAMADAN]
    res.json(data)
})

export default app

//