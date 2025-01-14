// Importation de la bibliothèque Mongoose pour intéragir avec MongoDB
import mongoose from "mongoose";

// Création de la fonction permettant de se connecter à MongoDB
export const dbConnection = async () => {
  try {
    // Connexion à la bdd
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Si la connexion réussi, message de succès
    console.log(`MongoDB est bien connecté : ${conn.connection.host}`);
    // Si la connexion échoue, affichage du message d'erreur
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
    // Arrêt du programme avec un code de sortie '1' indiquant une erreur
    process.exit(1);
  }
};
