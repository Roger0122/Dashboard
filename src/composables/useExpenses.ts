import { ref, computed } from 'vue'
import { expenses } from '@/data/expenses'

// import type { MonthlyExpense } from '@/types/expense'
// import { getAllExpenses } from '@/services/expenseService'


export const selectedYear = ref<number | 'all'>('all')

// 所有可選年份
const availableYears = computed(() => {
  const years = new Set(expenses.map(item => item.year))

  return [...years].sort((a, b) => b - a)
})

// 篩選後資料
const filteredExpenses = computed(() => {
  if (selectedYear.value === 'all') {
    return expenses
  }

  return expenses.filter(
    item => item.year === selectedYear.value
  )
})

export function useExpenses() {
  return {
    selectedYear,
    availableYears,
    filteredExpenses
  }
}
