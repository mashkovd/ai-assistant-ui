<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="login-container text-center bg-light p-4 rounded shadow">
      <h1 class="mb-3 text-primary">Welcome to AI Assistant</h1>
      <p class="mb-4 text-muted" v-if="!isCallback">Log in to continue</p>
      <button v-if="!isCallback" @click="loginWithGoogle" class="btn btn-primary btn-lg w-100">Login with Google</button>
      <p v-if="isCallback" class="text-muted">Processing login...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      isCallback: false,
    };
  },
  methods: {
    async loginWithGoogle() {
      try {
        const response = await axios.get('/auth/google', { withCredentials: true });

        if (response.data.redirect_url) {
          window.location.href = response.data.redirect_url;
        } else {
          console.error('Login failed: No redirect URL provided');
        }
      } catch (error) {
        console.error('Failed to initiate Google login:', error);
      }
    },
    async handleGoogleCallback() {
      try {
        const response = await axios.get('/auth/google/callback');
        const { user_email, redirect_url } = response.data;

        // Set the cookie explicitly in the browser
        document.cookie = `user_email=${user_email}; path=/; domain=mctl.me; secure; samesite=None`;

        // Redirect to the chat page
        window.location.href = redirect_url;
      } catch (error) {
        console.error('Failed to handle Google callback:', error);
      }
    },
  },
  mounted() {
    const route = useRoute();
    if (route.path === '/auth/google/callback') {
      this.isCallback = true;
      this.handleGoogleCallback();
    }
  },
};
</script>

<style>
.login-container {
  max-width: 350px;
}
</style>
