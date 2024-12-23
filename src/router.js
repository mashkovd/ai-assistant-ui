import { createRouter, createWebHistory } from 'vue-router';

// const Main = () => import('./pages/Main.vue');
import Main from './pages/Main.vue';
const Chat = () => import('./pages/Chat.vue');

const routes = [
  {
    path: '/',
    component: Main,
    name: 'Main',
  },
  {
    path: '/chat',
    component: Chat,
    name: 'Chat',
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }, // Redirect unknown paths to Main
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
