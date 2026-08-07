<template>
  <div class="p-6 space-y-6">
    <!-- KPI -->
    <h1 class="text-2xl font-bold">年份支出計算儀表版</h1>
    <YearFilter />

    <!-- KPI Cards -->

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <KpiCard title="總合計支出" :value="formatCurrency(totalExpense)" />

      <KpiCard title="每月平均支出" :value="formatCurrency(averageMonthlyExpense)" />

      <KpiCard
        title="最高月份支出"
        :value="formatCurrency(highestExpenseMonth?.total || 0)"
        :subtitle="highestExpenseMonth?.dateKey"
      />

      <KpiCard
        title="最低月份支出"
        :value="formatCurrency(lowestExpenseMonth?.total || 0)"
        :subtitle="lowestExpenseMonth?.dateKey"
      />
    </div>

    <!-- Chart Placeholder -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ExpenseLineChart></ExpenseLineChart>

      <ExpenseCategoryPieChart></ExpenseCategoryPieChart>
    </div>

    <!-- Table -->
    <!-- <div>
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
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { useExpenses } from '@/composables/useExpenses'
import ExpenseLineChart from '@/components/charts/ExpenseLineChart.vue'
import ExpenseCategoryPieChart from '@/components/charts/ExpenseCategoryPieChart.vue'
import KpiCard from '@/components/dashboard/KpiCard.vue'
import YearFilter from '@/components/dashboard/YearFilter.vue'

import { useExpenseStats } from '@/composables/useExpenseStats'
import { formatCurrency } from '@/utils/format'

// const { totalAll, sortedExpenses, categorySummary } = useExpenses()

const { totalExpense, averageMonthlyExpense, highestExpenseMonth, lowestExpenseMonth } =
  useExpenseStats()
</script>

<style scoped></style>
