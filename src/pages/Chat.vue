<template>
  <article class="chat-page">
    <div class="chat-page__container">
      <h1>Type command for buying stocks</h1>

      <form class="prompt-form" @submit.prevent="onSubmitPrompt">
        <BaseInput
          v-model="prompt"
          id="prompt"
          name="prompt"
          placeholder="I want to buy Nvidia"
          class="prompt-form__input"
        />
        <BaseButton class="prompt-form__submit">
          Send
        </BaseButton>
      </form>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue';

import { useConversation } from '@/features/conversation';
import { usePortfolio } from '@/features/portfolio';
import { BaseButton } from '@/shared/ui/button';
import { BaseInput } from '@/shared/ui/input';

const {
  isLoading: isLoadingPrompt,
  errorMessage: promptError,
  sendPrompt,
} = useConversation();

const {
  isLoading: isLoadingPortfolio,
  errorMessage: portfolioError,
  getPortfolio,
} = usePortfolio();

const isLoading = computed(() => isLoadingPrompt || isLoadingPortfolio);

const prompt = ref('');

function onSubmitPrompt() {
  sendPrompt(prompt.value);
}
</script>

<style>
.chat-page {
  padding: 20px 0;
  height: 100%;
}

.chat-page__container {
  width: 800px;
  margin: 0 auto;
  text-align: center;
}

.prompt-form {
  display: flex;
  align-items: center;
  column-gap: 8px;
}

.prompt-form__input {
  flex-grow: 1;
}
</style>
