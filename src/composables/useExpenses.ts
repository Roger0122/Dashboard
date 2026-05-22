import { ref, computed } from 'vue'
import type { MonthlyExpense } from '@/types/expense'
import { getAllExpenses } from '@/services/expenseService'

const expenses = ref<MonthlyExpense[]>(getAllExpenses())

export function useExpenses() {
  //  Total Yearly
  const totalAll = computed(() => expenses.value.reduce((sum, e) => sum + e.total, 0))
  // sort by date
  const sortedExpenses = computed(() =>
    [...expenses.value].sort((a, b) => a.dateKey.localeCompare(b.dateKey)),
  )
  // category aggregation
  const categorySummary = computed(() => {
    const result: Record<string, number> = {}

    expenses.value.forEach((e) => {
      Object.entries(e.breakdown).forEach(([Key, value]) => {
        result[Key] = (result[Key] || 0) + (value || 0)
      })
    })
    return result
  })

  return {
    expenses,
    totalAll,
    sortedExpenses,
    categorySummary,
  }
}
