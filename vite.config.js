import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __COMMIT__: JSON.stringify((process.env.COMMIT_SHA || "local").slice(0, 7)),
    __BUILT_AT__: JSON.stringify(new Date().toISOString()),
  },
});