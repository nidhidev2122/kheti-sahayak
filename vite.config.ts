import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// Standalone Vite + React app. No platform-specific plugins or server required.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "client/src"),
    },
  },
  root: path.resolve(rootDir, "client"),
  publicDir: path.resolve(rootDir, "client/public"),
  build: {
    outDir: path.resolve(rootDir, "dist"),
    emptyOutDir: true,
  },
  server: { host: "0.0.0.0", port: 5173 },
  preview: { host: "0.0.0.0", port: 4173 },
});
