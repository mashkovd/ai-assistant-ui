<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="login-container text-center bg-light p-4 rounded shadow">
      <h1 class="mb-3 text-primary">Welcome to AI Assistant</h1>
      <p class="mb-4 text-muted">Log in to continue</p>
      <button @click="loginWithGoogle" class="btn btn-primary btn-lg w-100">Login with Google</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {};
  },
  methods: {
    async loginWithGoogle() {
      try {
        // Initiate login by calling the backend Google login endpoint
        const response = await axios.get('/auth/google', { withCredentials: true });

        // Redirect to the Google OAuth login URL provided by the backend
        if (response.data.redirect_url) {
          window.location.href = response.data.redirect_url;
        } else {
          console.error('Login failed: No redirect URL provided');
        }
      } catch (error) {
        console.error('Failed to initiate Google login:', error);
      }
    },
  },
};
</script>

<style>
/* Compact and centered styling */
.login-container {
  max-width: 350px;
}
</style>
