<template>
  <BaseTable
    :columns="columns"
    :data="data"
    :is-loading="isLoading"
    class="portfolio-table"
  />
</template>

<script setup>
import { computed } from 'vue';

import emitter from '@/shared/utils/emitter';
import { usePortfolio } from '@/features/portfolio';
import { BaseTable } from '@/shared/ui/table';

const columns = [
  { name: 'symbol', label: 'Symbol' },
  { name: 'alias', label: 'Alias' },
  { name: 'quantity', label: 'Quantity' },
  { name: 'rate', label: 'Rate' },
];

const {
  data,
  isLoading,
  errorMessage,
  getPortfolio,
} = usePortfolio();

function updateData() {
  getPortfolio();
}

emitter.on('new-prompt', updateData);

async function init() {
  try {
    getPortfolio();
  } catch (err) {
    console.error('Portfolio loading error', err);
  }
}

init();
</script>
