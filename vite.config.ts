import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import UnoCSS from "unocss/vite";

const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
