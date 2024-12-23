import { createRouter, createWebHistory } from 'vue-router';

import Main from './pages/Main.vue';
const Chat = () => import('./pages/Chat.vue');
const AuthRoot = () => import('./pages/AuthRoot.vue');
const AuthForm = () => import('./pages/AuthForm.vue');
const AuthCallback = () => import('./pages/AuthCallback.vue');

const routes = [
  {
    path: '/',
    component: Main,
    name: 'Main',
    redirect: { name: 'Chat' },
  },
  {
    path: '/chat',
    component: Chat,
    name: 'Chat',
  },
  {
    path: '/auth',
    component: AuthRoot,
    name: 'AuthRoot',
    children: [
      {
        // when /auth is matched
        path: '',
        component: AuthForm,
        name: 'AuthForm',
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /auth/callback is matched
        path: 'callback',
        component: AuthCallback,
        name: 'AuthCallback',
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }, // Redirect unknown paths to Main
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add navigation guards
router.beforeEach(async (to, from) => {
  const authRoutes = ['AuthForm', 'AuthCallback'];
  const authToken = localStorage.getItem('auth_token');
  const isAuthRoute = authRoutes.includes(to.name); // ❗️ Avoid an infinite redirect

  if (!authToken && !isAuthRoute) {
    // redirect the user to the auth page
    return { name: 'AuthForm' };
  }
})

export default router;
