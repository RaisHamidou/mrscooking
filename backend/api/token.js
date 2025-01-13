/* import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

// Rate limiter pour éviter les abus
const downloadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limite à 10 tentatives par IP
  message: 'Trop de tentatives de téléchargement, veuillez réessayer plus tard.'
});

// Middleware de vérification du token
const verifyDownloadToken = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(403).json({ 
      message: 'Accès refusé. Token requis.' 
    });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifier si le token n'est pas expiré
    const now = Date.now();
    if (decoded.exp < now) {
      return res.status(403).json({ 
        message: 'Token expiré.' 
      });
    }

    // Vérifier si le livre demandé correspond au token
    if (decoded.bookId !== parseInt(req.params.bookId)) {
      return res.status(403).json({ 
        message: 'Token invalide pour ce livre.' 
      });
    }

    // Ajouter les informations décodées à la requête
    req.downloadInfo = {
      userId: decoded.userId,
      bookId: decoded.bookId,
      purchaseId: decoded.purchaseId
    };

    next();
  } catch (error) {
    return res.status(403).json({ 
      message: 'Token invalide.' 
    });
  }
};

// Fonction pour générer un token de téléchargement
const generateDownloadToken = (userId, bookId, purchaseId) => {
  return jwt.sign({
    userId,
    bookId,
    purchaseId,
    iat: Date.now(),
    exp: Date.now() + (30 * 60 * 1000) // Expire dans 30 minutes
  }, process.env.JWT_SECRET);
};

// Configuration des routes
const configureDownloadRoutes = (router) => {
  // Appliquer le rate limiter à toutes les routes de téléchargement
  router.use('/download', downloadLimiter);
  
  // Route de téléchargement sécurisée
  router.get('/download/:bookId', verifyDownloadToken, (req, res) => {
    // Votre logique de téléchargement ici
  });

  return router;
};

export { configureDownloadRoutes, generateDownloadToken }; */