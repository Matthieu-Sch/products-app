// Importation de la fonction 'create' depuis la bibliothèque Zustand
import { create } from "zustand";

// Création et exportation du store 'useProductStore'
export const useProductStore = create((set) => ({
  // Définition de l'état initial : une liste de produits vide
  products: [],
  // Définition d'une fonction pour mettre à jour la liste des produits
  // 'setProducts' prend un argument 'products' (la nouvelle liste de produits)
  setProducts: (products) => set({ products }), // Met à jour l'état en remplaçant 'products' par la nouvelle liste
  // Fonction asynchrone pour créer un nouveau produit
  createProduct: async (newProduct) => {
    // Vérification que tous les champs requis du produit sont remplis
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      // Si un champ est manquant, retourner un message d'erreur
      return { success: false, message: "Merci de remplir tous les champs." };
    }

    // Envoi d'une requête POST vers l'API pour créer le produit
    const res = await fetch("/api/produits", {
      method: "POST", // Méthode HTTP utilisée : POST (pour envoyer des données)
      headers: { "Content-Type": "application/json" }, // Spécifie que les données envoyées sont au format JSON
      body: JSON.stringify(newProduct), // Corps de la requête contenant le produit converti en JSON
    });

    // Transformation de la réponse en JSON pour accéder aux données
    const data = await res.json();

    // Mise à jour de l'état en ajoutant le nouveau produit à la liste existante
    set((state) => ({
      products: [...state.products, data.data],
    }));
    return { success: true, message: "Le produit a bien été créé." };
  },
  // Fonction pour récupérer tous les produits
  getAllProducts: async () => {
    // Effectue une requête GET pour récupérer la liste complète des produits
    const res = await fetch("/api/produits/tous_les_produits");
    // Convertit la réponse en JSON
    const data = await res.json();
    // Affiche les données récupérées dans la console (utile pour le débogage)
    console.log(data);
    // Met à jour l'état global avec la liste des produits récupérés
    set({ products: data.allProducts });
  },

  // Fonction pour supprimer un produit spécifique
  deleteProduct: async (pid) => {
    // Effectue une requête DELETE pour supprimer le produit avec l'ID donné
    const res = await fetch(`/api/produits/${pid}`, { method: "DELETE" });
    // Convertit la réponse en JSON
    const data = await res.json();
    // Si la suppression échoue, retourne un message d'erreur
    if (!data.success) return { success: false, message: data.message };
    // Met à jour l'état global en filtrant les produits pour exclure celui supprimé
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    // Retourne un message de succès après suppression
    return { success: true, message: data.message };
  },

  // Fonction pour mettre à jour un produit spécifique
  updateProduct: async (pid, updatedProduct) => {
    // Effectue une requête PUT pour mettre à jour le produit avec l'ID donné
    const res = await fetch(`/api/produits/${pid}`, {
      method: "PUT", // Méthode HTTP utilisée pour la mise à jour
      headers: { "content-Type": "application/json" }, // Spécifie le type de contenu comme JSON
      body: JSON.stringify(updatedProduct), // Convertit le produit mis à jour en JSON
    });
    // Convertit la réponse en JSON
    const data = await res.json(); // Correction ajoutée : appel explicite à `.json()`
    // Si la mise à jour échoue, retourne un message d'erreur
    if (!data.success) return { success: false, message: data.message };
    // Met à jour l'état global en remplaçant le produit modifié par la nouvelle version
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    // Retourne un message de succès après mise à jour
    return { success: true, message: data.message };
  },
}));
