<template></template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

import { useAuth } from '@/features/auth';

const { updateState } = useAuth();

function initPage() {
  const router = useRouter();
  const route = useRoute();

  const authToken = route.query.token;

  localStorage.setItem("auth_token", authToken);
  updateState();

  router.replace({ path: '/' });
}

initPage();
</script>
