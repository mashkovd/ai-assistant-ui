<template>
  <article class="admin-page">
    <div class="admin-page__container">
      <h1 class="chat-page__title">Hello, admin</h1>

      <PromptForm
        placeholder="Ask a question about portfolio or orders"
        :is-loading="isLoadingPrompt"
        @submit="onSubmitPrompt"
      />

      <ul class="admin-page__conversation">
        <li v-for="item in conversation">
          <ConversationItem
            :question="item.question"
            :answer="item.answer"
          />
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue';

import emitter from '@/shared/utils/emitter';
import { useConversation } from '@/features/conversation';
import { PromptForm } from '@/features/prompt-form';
import { ConversationItem } from '@/features/conversation';

const {
  isLoading: isLoadingPrompt,
  sendPrompt,
} = useConversation();

const conversation = ref([]);

async function onSubmitPrompt(value) {
  try {
    conversation.value.push({
      question: value,
    });
    const resData = await sendPrompt(value);

    conversation.value[conversation.value.length - 1].answer = resData.response;

    emitter.emit('new-admin-prompt');
  } catch (err) {
    console.error('Prompt sending error', err);
  }
}
</script>

<style>
.admin-page {
  padding: 20px 0;
  height: 100%;
}

.admin-page__container {
  width: 800px;
  margin: 0 auto;
}
</style>
