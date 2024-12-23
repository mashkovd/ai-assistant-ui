<template></template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

function initPage() {
  const router = useRouter();
  const route = useRoute();

  const authToken = route.query.token;

  localStorage.setItem("auth_token", authToken);

  router.replace({ path: '/' });
}

initPage();
</script>
