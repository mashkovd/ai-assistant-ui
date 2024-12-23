<template>
  <article class="chat-page">
    <div class="chat-page__container">
      <h1 class="chat-page__title">Type command for buying stocks</h1>

      <PromptForm
        placeholder="I want to buy 5 Nvidia stocks..."
        :is-loading="isLoadingPrompt"
        @submit="onSubmitPrompt"
      />

      <section class="chat-page__portfolio">
        <h2 class="chat-page__section-title">Portfolio</h2>
        <PortfolioTable />
      </section>

      <section class="chat-page__orders">
        <h2 class="chat-page__section-title">Orders</h2>
        <OrdersTable />
      </section>
    </div>
  </article>
</template>

<script setup>
import emitter from '@/shared/utils/emitter';
import { useConversation } from '@/features/conversation';
import { PromptForm } from '@/features/prompt-form';
import { PortfolioTable } from '@/features/portfolio';
import { OrdersTable } from '@/features/orders';

const {
  isLoading: isLoadingPrompt,
  errorMessage,
  sendPrompt,
} = useConversation();

async function onSubmitPrompt(value) {
  try {
    await sendPrompt(value);

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

.chat-page__title {
  margin-bottom: 16px;
}

.chat-page__container {
  width: 800px;
  margin: 0 auto;
  text-align: center;
}

.chat-page__portfolio {
  margin-top: 36px;
}

.chat-page__orders {
  margin-top: 36px;
}

.chat-page__section-title {
  text-align: left;
}

@media screen and (max-width: 1024px) {
  .chat-page__container {
    width: 100%;
  }

  .chat-page__title {
    margin-bottom: 8px;
  }
}
</style>
