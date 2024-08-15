import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes, handleHotUpdate } from "vue-router/auto-routes";
import App from "./App.vue";
import "@repo/ui/styles";
import { createPinia } from "pinia";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

if (import.meta.hot) handleHotUpdate(router);

const pinia = createPinia();
createApp(App).use(router).use(pinia).mount("#app");
