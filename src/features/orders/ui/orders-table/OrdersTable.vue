<template>
  <BaseTable
    :columns="columns"
    :data="data"
    :is-loading="isLoading"
    class="orders-table"
  />
</template>

<script setup>
import emitter from '@/shared/utils/emitter';
import { useOrders } from '@/features/orders';
import { BaseTable } from '@/shared/ui/table';

const columns = [
  { name: 'symbol', label: 'Symbol' },
  { name: 'alias', label: 'Alias' },
  { name: 'action', label: 'Act' },
  { name: 'quantity', label: 'Quantity' },
  { name: 'rate', label: 'Rate' },
];

const {
  data,
  isLoading,
  errorMessage,
  getOrders,
} = useOrders();

function updateData() {
  getOrders();
}

emitter.on('new-prompt', updateData);

async function init() {
  try {
    getOrders();
  } catch (err) {
    console.error('Orders loading error', err);
  }
}

init();
</script>
