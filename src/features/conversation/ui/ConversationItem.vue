<template>
  <article class="conversation-item">
    <p>
      <strong>Question:</strong> {{ question }}
    </p>
    <p>
      <strong>Answer:</strong> {{ answer }}
    </p>
  </article>
</template>

<script setup>
const props = defineProps({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});
</script>
