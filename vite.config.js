import { defineConfig } from "vite";
import inlineCriticalCss from "./inlineCriticalCss.js";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inlineCriticalCss()],
});
