<template>
  <div class="p-6 space-y-6">
    <!-- KPI -->
    <div class="grid grid-cols-3 gap-4">
      <div class="card">總合計: {{ totalAll }}</div>
      <div class="card">月份: {{ sortedExpenses.length }}</div>
      <div class="card">類別合計: {{ Object.keys(categorySummary).length }}</div>
    </div>

    <!-- Chart Placeholder -->
    <div class="h-auto bg-gray-100 rounded-xl flex items-center justify-center">
      <ExpenseLineChart></ExpenseLineChart>
    </div>

    <!-- Table -->
    <div>
      <table class="w-full text-sm">
        <thead>
          <tr>
            <th>年-月</th>
            <th>合計</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in sortedExpenses" :key="item.dateKey">
            <td>{{ item.dateKey }}</td>
            <td>{{ item.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useExpenses } from '@/composables/useExpenses'
import ExpenseLineChart from '@/components/charts/ExpenseLineChart.vue'

const { totalAll, sortedExpenses, categorySummary } = useExpenses()
</script>

<style scoped></style>
