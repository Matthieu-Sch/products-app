import mongoose from "mongoose";

import Product from "../models/product.model.js";

// Logique et chemin pour l'affichage de l'ensemble des produits
export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({ success: true, allProducts });
  } catch (error) {
    console.log(`Error in fetching products ${error.message}`);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// Logique et chemin pour la création d'un produit
export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    console.log("tous les champs doivent être remplis.", product.name);
    return res
      .status(400)
      .json({ success: false, message: "Merci de remplir tous les champs." });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Le produit a été ajouté avec succès.",
      data: newProduct,
    });
  } catch (error) {
    console.log(`Erreur lors de la création du produit : ${error.message}`);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// Logique et chemin pour la modification d'un produit
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  // Vérification quant au remplissage des champs
  if (!product.name || !product.price || !product.image) {
    console.log("tous les champs doivent être remplis.", product.name);
    return res
      .status(400)
      .json({ success: false, message: "Merci de remplir tous les champs." });
  }

  // Vérification de la validité de l'id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "L'id est invalide" });
  }

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (!updateProduct) {
      console.log(`Produit non trouvé : ${id}`);
      return res
        .status(400)
        .json({ success: false, message: "Aucun produit trouvé." });
    }
    return res.status(200).json({
      success: true,
      message: "Produit modifié avec succès.",
      data: updateProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// Logique et chemin pour la suppression d'un produit
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  // console.log(`id : ${id}`);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "L'id est pas valide." });
  }

  try {
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res
        .status(404)
        .json({ success: false, message: "Le produit n'existe pas." });
    }

    await Product.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Le produit a été supprimé avec succès.",
    });
  } catch (error) {
    console.log(`Erreur : ${error.message}`);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
