import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/mealdb": {
        target: "http://www.themealdb.com/api/json/v1/1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mealdb/, ""),
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
