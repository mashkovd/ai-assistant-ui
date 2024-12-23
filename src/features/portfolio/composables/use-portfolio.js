import { ref, computed } from 'vue';
import baseApi from '@/shared/api';

export function usePortfolio() {
  const rawData = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref('');

  const data = computed(() => {
    return rawData.value.map((item) => ({
      ...item,
      rate: item.rate ? Number(item.rate).toFixed(0) : '',
    }))
  })

  async function getPortfolio() {
    isLoading.value = true;
    errorMessage.value = '';

    try {
      const response = await baseApi.post("/portfolio", {});

      console.log("Portfolio response:", response.data);
      rawData.value = response.data?.portfolio;
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
