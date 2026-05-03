import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    proxy: {
      "/api": {
        target:
          "https://d6cf-2401-4900-892f-96e2-66f8-11f5-3641-5022.ngrok-free.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    },
  },
});
