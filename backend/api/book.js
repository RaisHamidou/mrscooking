import express from "express"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get("/:id", (req, res) => {
    const id = decodeURIComponent(req.params.id); // Décoder le paramètre
    const userHasAccess = true;

    if (!userHasAccess) {
        return res.status(403).json({ error: "Access denied" });
    }

    const filePath = path.join(__dirname, "../Books", `${id}.zip`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
    }

    res.sendFile(filePath);
});


export default router