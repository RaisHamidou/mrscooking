import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/:id", (req, res) => {
    const id = req.params.id;

    // Vérification des droits d'accès (adapter à vos besoins)
    const userHasAccess = true;

    if (!userHasAccess) {
        return res.status(403).json({ error: "Access denied" });
    }

    // Recherche des fichiers PDF et ZIP
    const possibleExtensions = [".pdf", ".zip"];
    let filePath;

    for (const ext of possibleExtensions) {
        const potentialPath = path.join(__dirname, "../Books", `${id}${ext}`);
        if (fs.existsSync(potentialPath)) {
            filePath = potentialPath;
            break;
        }
    }

    if (!filePath) {
        return res.status(404).json({ error: "File not found" });
    }

    // Envoi du fichier trouvé
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(500).json({ error: "Failed to send file" });
        }
    });
});

export default router;
