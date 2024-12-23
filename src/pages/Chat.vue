<template>
  <main class="border rounded mx-auto my-5 p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>Chat with AI Assistant</h1>
    </div>
    <p>Type command for buying stocks</p>
    <div id="conversation" class="px-2"></div>
    <div class="d-flex justify-content-center mb-3">
      <div :class="spinnerClass"></div>
    </div>
    <form @submit.prevent="onSubmitPrompt">
      <input v-model="prompt" id="prompt-input" name="prompt" class="form-control" />
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary mt-2">Send</button>
      </div>
    </form>
    <form @submit.prevent="getPortfolio">
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary mt-2">Portfolio</button>
      </div>
    </form>
    <div v-if="promptError || portfolioError" class="text-danger">
      {{ promptError || portfolioError }}
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useConversation } from '@/features/conversation';
import { usePortfolio } from '@/features/portfolio';

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

const spinnerClass = computed(() => ({
  "opacity-0": !isLoading,
  "opacity-1 active": isLoading,
  "transition-opacity": true,
  "rounded-circle": true,
  "border": true,
  "border-bottom-color-transparent": true,
  "width-30": true,
  "height-30": true,
}));

const prompt = ref('');

function onSubmitPrompt() {
  sendPrompt(prompt.value);
}
</script>