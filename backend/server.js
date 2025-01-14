// Importation de la bibliothèque 'dotenv'
import dotenv from "dotenv";
// Importation du module 'express' pour la création à la gestion d'un serveur web
import express from "express";
// Importation de la fonction 'dbConnection'
import { dbConnection } from "./config/db.js";
// Inportation du fichiercontant la logique des routes 'produits'
import path from "path";
import productsRoute from "./routes/product.route.js";

// Configuration de l'application pour lire et utiliser les variables dans le fichier '.env'
dotenv.config();

// Création d'une application 'express' qui représentera le serveur
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware permettant d'accepter les données JSON dans le corps des requêtes (req.body)
app.use(express.json());

// Obtenir le chemin absolu du répertoire actuel (le répertoire où ce fichier se trouve).
const __dirname = path.resolve();

// Middleware pour analyser les données URL-encodées dans le corps des requêtes
app.use(express.urlencoded({ extended: false }));

// Association du chemin '/api/produits au fichier contenant la logique des routes 'produits'
app.use("/api/produits", productsRoute);

// Vérifie si l'application est en mode "production" (environnement de déploiement).
if (process.env.NODE_ENV === "production") {
  // Définit le répertoire des fichiers statiques pour l'application express,
  // qui se trouvent dans le dossier "frontend/dist".
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
} else {
  app.use(express.static(path.join(__dirname, "/frontend")));
}

// Définit une route globale qui capte toutes les requêtes restantes ("*").
// Si aucune autre route spécifique n'est trouvée, cette route sera utilisée.
app.get("*", (req, res) => {
  // Renvoie le fichier "index.html" situé dans le dossier "frontend/dist".
  // Cela garantit que l'application frontend peut gérer les routes côté client.
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Démarrage du serveur sur le port '3000'
// Affichage d'un message pour indiquer le serveur a correctement démarré
app.listen(PORT, () => {
  dbConnection();
  console.log(`Le serveur à correctement démarré sur http://localhost:${PORT}`);
});
