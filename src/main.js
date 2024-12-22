import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Ensure the router is imported correctly
import VueAxios from 'vue-axios';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Set Axios base URL from environment variable
axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT || 'https://ai-assistant.mctl.ru';
axios.defaults.withCredentials = true; // Ensure cookies are sent

console.log('Base URL:', axios.defaults.baseURL); // Debugging

const app = createApp(App);
app.use(router); // Use the router
app.use(VueAxios, axios); // Use Axios globally
app.mount('#app');