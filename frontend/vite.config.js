import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  server: {
    port: 5000,

    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
});
