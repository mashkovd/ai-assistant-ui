<template>
  <article class="auth-form-page">
    <form class="auth-form" @submit.prevent="loginWithGoogle">
      <h1 class="auth-form__title">Welcome to AI Assistant</h1>
      <p class="auth-form__text">Log in to continue</p>
      <BaseButton size="l" class="auth-form__button">
        Log in with Google
      </BaseButton>
    </form>
  </article>
</template>

<script setup>
import { useAuth } from '@/features/auth';
import { BaseButton } from '@/shared/ui/button';

const { loginWithGoogle } = useAuth();
</script>

<style>
.auth-form-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.auth-form {
  max-width: 350px;
  text-align: center;
}

.auth-form__button {
  width: 100%;
}

.auth-form__title {
  font-size: 32px;
  margin: 0 0 20px;
}
</style>
