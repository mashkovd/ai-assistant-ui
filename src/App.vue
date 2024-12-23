<template>
  <div class="app">
    <header class="app__header">
      <strong>Chat with AI Assistant</strong>
      <div class="app__header-menu">
        <BaseButton v-if="!isAuthorized">
          Login
        </BaseButton>
        <div
          v-else
          class="app__user-menu"
        >
          <span>{{ userEmail }}</span>
          <BaseButton @click="logOut">
            Logout
          </BaseButton>
        </div>
      </div>
    </header>
    <main class="app__main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useAuth } from '@/features/auth';
import { BaseButton } from '@/shared/ui/button';

const { isAuthorized, userEmail, logOut } = useAuth();
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app__header {
  height: 48px;
  margin-bottom: 20px;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.app__user-menu {
  display: flex;
  align-items: center;
  column-gap: 12px;
}

.app__main {
  flex-grow: 1;
}
</style>
