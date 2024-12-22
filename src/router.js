import { createRouter, createWebHistory } from 'vue-router';
import Main from './components/Main.vue';
import Chat from './components/Chat.vue';

const routes = [
  { path: '/', component: Main, name: 'Main' }, // Default route
  { path: '/chat', component: Chat, name: 'Chat' }, // Chat page
  { path: '/:pathMatch(.*)*', redirect: '/' }, // Redirect unknown paths to Main
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
