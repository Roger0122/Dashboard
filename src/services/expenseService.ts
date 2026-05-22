import type { MonthlyExpense } from '@/types/expense'
import { expenses } from '@/data/expenses/index'

export function getAllExpenses(): MonthlyExpense[] {
  return expenses
}

export function getExpensesByDate(dateKey: string) {
  return expenses.find((e: any) => e.dateKey === dateKey)
}

export function getExpenseByYear(year: number) {
  return expenses.filter((e: any) => e.yea === year)
}
