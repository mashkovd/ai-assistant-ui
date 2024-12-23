import { ref } from 'vue';
import baseApi from '@/shared/api';

export function usePortfolio() {
  const data = ref(null);
  const isLoading = ref(false);
  const errorMessage = ref('');

  async function getPortfolio() {
    isLoading.value = true;
    errorMessage.value = '';

    try {
      const response = await baseApi.post("/portfolio", {});

      console.log("Portfolio response:", response.data);
      data.value = response.data?.portfolio;
    } catch (error) {
      errorMessage.value = "Failed to load portfolio. Try again.";
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    data,
    isLoading,
    errorMessage,
    getPortfolio,
  };
}
