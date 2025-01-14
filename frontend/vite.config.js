import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuration du serveur de développement
  server: {
    // Définition des règles de proxy pour rediriger certaines requêtes
    proxy: {
      // Toutes les requêtes commençant par "/api" seront redirigées
      "/api": {
        // Cible des requêtes redirigées : le serveur backend local à l'adresse http://localhost:3000
        target: "http://localhost:3000",
      },
    },
  },
});
