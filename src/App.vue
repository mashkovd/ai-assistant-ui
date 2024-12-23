<template>
  <div class="app">
    <header class="app__header">
      <strong class="app__logo">Chat with AI Assistant</strong>
      <div
        v-if="isAuthorized"
        class="app__user-menu"
      >
        <span class="app__user-name">{{ userEmail }}</span>
        <BaseButton @click="logOut">
          Logout
        </BaseButton>
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
  gap: 16px;
  flex-shrink: 0;
}

.app__logo {
  flex-shrink: 0;
}

.app__user-menu {
  display: flex;
  align-items: center;
  column-gap: 12px;
  min-width: 0;
}

.app__user-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app__main {
  flex-grow: 1;
  padding: 0 20px;
}

@media screen and (max-width: 1024px) {
  .app__header {
    padding: 0 12px;
  }

  .app__main {
    padding: 0 12px;
  }
}
</style>
