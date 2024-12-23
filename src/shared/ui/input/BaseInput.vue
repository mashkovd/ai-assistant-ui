<template>
  <input v-model="model" class="base-input" :class="classes" type="text" />
</template>

<script setup>
import { computed } from 'vue';

const { size } = defineProps({
  size: String,
});

const model = defineModel();

const classes = computed(() => [
  `base-button--size--${size}`,
]);
</script>

<style scoped>
.base-input {
  padding: 0 16px;
  height: 32px;

  border: 1px solid #b9b9b9;
  border-radius: 4px;

  transition: all .25s ease;
}

.base-input:hover {
  border-color: #10a37f;
}
.base-input:focus {
  outline: none;
  border-color: #097c5f;
}
</style>
