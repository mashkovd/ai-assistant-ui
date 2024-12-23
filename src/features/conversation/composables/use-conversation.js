import { ref } from 'vue';
import baseApi from '@/shared/api';

export function useConversation() {
  const isLoading = ref(false);
  const errorMessage = ref('');

  async function sendPrompt(value) {
    isLoading.value = true;
    errorMessage.value = '';

    try {
      const response = await baseApi.post(
        "/chat",
        { prompt: value },
      );

      console.log("Prompt response:", response.data);
    } catch (error) {
      errorMessage.value = "Failed to send the prompt. Try again.";
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    errorMessage,
    sendPrompt,
  };
}
