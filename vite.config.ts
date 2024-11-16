import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/nlp": {
        target: "https://api.nlpcloud.io/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/nlp/, ""), // Strip only /api/nlp
        secure: false,
      },
      "/api/clarifai": {
        target: "https://api.clarifai.com/v2/models",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/clarifai/, ""), // Strip only /api/clarifai
        secure: false,
      }
    },
  },
});
