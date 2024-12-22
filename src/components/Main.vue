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
import axios from "axios";

export default {
  methods: {
    async loginWithGoogle() {
      try {
        const response = await axios.get("/auth/google");
        if (response.data.redirect_url) {
          window.location.href = response.data.redirect_url;
        } else {
          console.error("Login failed: No redirect URL provided");
        }
      } catch (error) {
        console.error("Failed to initiate Google login:", error);
      }
    },
    async handleGoogleCallback() {
      try {
        const response = await axios.get("https://ai-assistant.mctl.ru/auth/google/callback");
        const { token, redirect_url } = response.data;

        // Store the token
        localStorage.setItem("auth_token", token);

        // Redirect to the chat page
        window.location.href = redirect_url;
      } catch (error) {
        console.error("Failed to handle Google callback:", error);
      }
    },
  },
  mounted() {
    const currentPath = window.location.pathname;
    if (currentPath === "/auth/google/callback") {
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
