import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller.js";
// Importation de l'instance route d'express pour la gestion des routes
const router = express.Router();

// Logique et chemin pour l'affichage de l'ensemble des produits
router.get("/tous_les_produits", getAllProducts);

// Logique et chemin pour la création d'un produit
router.post("/", createProduct);

// Logique et chemin pour modifier un produit
router.put("/:id", updateProduct);

// Logique et chemin pour la suppression d'un produit
router.delete("/:id", deleteProduct);

export default router;
