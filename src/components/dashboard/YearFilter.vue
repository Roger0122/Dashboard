<template>
  <div class="flex items-center gap-3">

    <label class="text-sm font-medium">
      年份
    </label>

    <select
      v-model="selectedYear"
      class="px-3 py-2 rounded-xl border bg-white shadow-sm"
    >
      <option value="all">
        All Years
      </option>

      <option
        v-for="year in availableYears"
        :key="year"
        :value="year"
      >
        {{ year }}
      </option>
    </select>

  </div>
</template>

<script setup lang="ts">
import { useExpenses } from '@/composables/useExpenses'

const {
  selectedYear,
  availableYears
} = useExpenses()
</script>


<style scoped>
</style>