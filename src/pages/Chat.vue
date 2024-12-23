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
        <BaseButton
          class="prompt-form__submit"
          :disabled="isLoadingPrompt"
        >
          Send
        </BaseButton>
      </form>

      <PortfolioTable class="chat-page__portfolio" />
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue';

import emitter from '@/shared/utils/emitter';
import { useConversation } from '@/features/conversation';
import { BaseButton } from '@/shared/ui/button';
import { BaseInput } from '@/shared/ui/input';

import { PortfolioTable } from '@/features/portfolio';

const {
  isLoading: isLoadingPrompt,
  errorMessage,
  sendPrompt,
} = useConversation();

const prompt = ref('');

async function onSubmitPrompt() {
  try {
    await sendPrompt(prompt.value);

    emitter.emit('new-prompt');
  } catch (err) {
    console.error('Prompt sending error', err);
  }
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

.chat-page__portfolio {
  margin-top: 32px;
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
