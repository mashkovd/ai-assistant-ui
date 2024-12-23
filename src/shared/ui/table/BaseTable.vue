<template>
  <div class="base-table">
    <table class="base-table__table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.name">
            {{ column.label || column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="noData">
          <tr>
            <td :colspan="columns.length" class="base-table__no-data">
              NO DATA
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="item in data" :key="item.id">
            <td v-for="column in columns" :key="column.name">
              {{ column.format ? column.format(item[column.name]) : item[column.name] }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
  },
});

const noData = computed(() => !props.data || !props.data.length);
</script>

<style scoped>
.base-table__table {
  width: 100%;
  border: none;
  border-collapse: collapse;
  border-spacing: 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  overflow: hidden;
}

.base-table thead tr {
  background-color: #009879;
  color: #ffffff;
}

.base-table tbody {
  position: relative;
}

.base-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.base-table tbody tr:nth-of-type(odd) {
  background-color: #fff;
}
.base-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}
.base-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.base-table th, .base-table td {
  padding: 12px 15px;
  text-align: center;
}

.base-table__no-data {
  text-align: center;
}
</style>
