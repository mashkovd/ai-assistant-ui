<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="login-container text-center bg-light p-4 rounded shadow">
      <h1 class="mb-3 text-primary">Welcome to AI Assistant</h1>
      <p class="mb-4 text-muted">Log in to continue</p>
      <button @click="loginWithGoogle" class="btn btn-primary btn-lg w-100">Login with Google</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuth } from '@/features/auth';

const { loginWithGoogle, handleGoogleCallback } = useAuth();

onMounted(() => {
  const currentPath = window.location.pathname;
  if (currentPath === "/auth/google/callback") {
    handleGoogleCallback();
  }
});
</script>

<style>
.login-container {
  max-width: 350px;
}
</style>
