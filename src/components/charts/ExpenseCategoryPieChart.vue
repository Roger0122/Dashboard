<template>
  <div
    ref="chartRef"
    class="w-full h-96 bg-white rounded-xl shadow"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { useExpenses } from '@/composables/useExpenses'

const {
  filteredExpenses
} = useExpenses()


const chartRef = ref<HTMLDivElement | null>(null)

let chartInstance: echarts.ECharts | null = null

//  1.累積的category totals
const categoryTotals = computed(() => {
  const totals = {
    food: 0,
    living: 0,
    entertainment: 0,
    transport: 0,
    other: 0
  }

  filteredExpenses.value.forEach(item => {
    Object.entries(item.breakdown).forEach(([key, value]) => {
      totals[key as keyof typeof totals] += value || 0
    })
  })

  return totals
})

// 2.ECharts format
const pieData = computed(() => {
  return Object.entries(categoryTotals.value).map(([key, value]) => ({
    name: key,
    value
  }))
})
// 3.option
const getOption = () => ({
  tooltip: {
    trigger: 'item'
  },

  legend: {
    bottom: '0%'
  },

  series: [
    {
      name: 'Expense Categories',
      type: 'pie',
      radius: ['20%', '60%'], // donut style

      data: pieData.value,

      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0
        }
      },

      label: {
        formatter: '{b}\n{d}%'
      }
    }
  ]
})
// 4. init chart
const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption(getOption())
}

onMounted(() => {
  initChart()

  window.addEventListener('resize', () => {
    chartInstance?.resize()
  })
})

watch(
  pieData,
  () => {
    chartInstance?.setOption(getOption())
  },
  {
    deep: true
  }
)

</script>


<style scoped></style>