import { createRouter, createWebHistory } from "vue-router";
import Main from "@/components/Main.vue";
import Chat from "@/components/Chat.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/chat", component: Chat },
  // { path: "/auth/google/callback", component: Main }, // Use Main.vue to handle the callback
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
