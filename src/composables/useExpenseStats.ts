import { computed } from 'vue'
import { useExpenses } from './useExpenses'



export function useExpenseStats() {
  const { filteredExpenses } = useExpenses()

  // Total
  const totalExpense = computed(() => {
    return filteredExpenses.value.reduce((sum, item) => sum + item.total, 0)
  })

  // Average
  const averageMonthlyExpense = computed(() => {
    if (!filteredExpenses.value.length) return 0

    return Math.round(totalExpense.value / filteredExpenses.value.length)
  })

  // Highest Month
  const highestExpenseMonth = computed(() => {
    return [...filteredExpenses.value].sort((a, b) => b.total - a.total)[0]
  })

  // Lowest Month
  const lowestExpenseMonth = computed(() => {
    return [...filteredExpenses.value].sort((a, b) => a.total - b.total)[0]
  })

  return {
    totalExpense,
    averageMonthlyExpense,
    highestExpenseMonth,
    lowestExpenseMonth
  }
}