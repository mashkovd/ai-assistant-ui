import { ref } from 'vue';
import baseApi from '@/shared/api';

export function usePortfolio() {
  const isLoading = ref(false);
  const errorMessage = ref('');

  async function getPortfolio() {
    isLoading.value = true;
    errorMessage.value = '';

    try {
      const response = await baseApi.post(
        "/portfolio",
        {},
      );

      console.log("Order response:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
      errorMessage.value = "Failed to place the order. Try again.";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    errorMessage,
    getPortfolio,
  };
}
