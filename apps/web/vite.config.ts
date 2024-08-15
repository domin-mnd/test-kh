import vue from "@vitejs/plugin-vue";
import vueRouter from "unplugin-vue-router/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vueRouter(), vue()],
});
