<template>
  <form class="prompt-form" @submit.prevent="$emit('submit', prompt)">
    <BaseInput
      v-model="prompt"
      id="prompt"
      name="prompt"
      :placeholder="placeholder"
      class="prompt-form__input"
    />
    <BaseButton
      class="prompt-form__submit"
      :disabled="isLoading"
    >
      Send
    </BaseButton>
  </form>
</template>

<script setup>
import { ref } from 'vue';

import { BaseButton } from '@/shared/ui/button';
import { BaseInput } from '@/shared/ui/input';

const props = defineProps({
  placeholder: {
    type: String,
  },
  isLoading: {
    type: Boolean,
  },
});

const emit = defineEmits(['submit']);

const prompt = ref('');
</script>

<style scoped>
.prompt-form {
  display: flex;
  align-items: center;
  column-gap: 8px;
}

.prompt-form__input {
  flex-grow: 1;
}
</style>
