import { ref, computed } from 'vue';
import baseApi from '@/shared/api';

export function useOrders() {
  const rawData = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref('');

  const data = computed(() => {
    return rawData.value.map((item) => ({
      ...item,
      rate: item.rate ? Number(item.rate).toFixed(0) : '',
    }))
  })

  async function getOrders() {
    isLoading.value = true;
    errorMessage.value = '';

    try {
      const response = await baseApi.post("/orders", {});

      console.log("Orders response:", response.data);
      rawData.value = response.data?.orders;
    } catch (error) {
      errorMessage.value = "Failed to load orders. Try again.";
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    data,
    isLoading,
    errorMessage,
    getOrders,
  };
}
