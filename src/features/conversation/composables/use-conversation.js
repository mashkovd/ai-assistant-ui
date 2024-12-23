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
      console.error("Error sending prompt:", error);
      errorMessage.value = "Failed to send the prompt. Try again.";
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
