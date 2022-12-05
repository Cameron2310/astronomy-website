import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/static/",
  build: {
    outDir: "../backend/static",
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [react()],
});
