<template>
  <button class="base-button" :class="classes">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const { size } = defineProps({
  size: String,
});

const classes = computed(() => [
  `base-button--size--${size}`,
]);
</script>

<style scoped>
.base-button {
  padding: 0px 16px;
  height: 32px;

  font-size: 1rem;
  color: #fff;
  background-color: #009879;
  border: none;
  border-radius: 4px;

  transition: all .25s ease;
}

.base-button:hover {
  background-color: #097a64;
}

.base-button:disabled {
  opacity: .6;
  pointer-events: none;
}

.base-button--size--l {
  padding: 0 32px;
  height: 40px;
  font-size: 1.2rem;
}
</style>
