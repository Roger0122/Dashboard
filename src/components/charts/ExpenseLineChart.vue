<template>
  <div ref="chartRef" class="w-full h-80 bg-white rounded-xl shadow" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch,computed } from 'vue'
import * as echarts from 'echarts'
import { expenses } from '@/data/expenses/index'
import { useExpenses } from '@/composables/useExpenses'

const {
  filteredExpenses
} = useExpenses()

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const chartData = computed(() =>
  filteredExpenses.value
    .slice()
    .sort((a, b) => a.dateKey.localeCompare(b.dateKey))
)
const xData = computed(() => chartData.value.map((item) => item.dateKey))
const yData = computed(() => chartData.value.map((item) => item.total))

const getOption = () => ({
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: xData.value,
     axisLabel: {
    interval: 0,
    rotate: 45,
    }
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Total Expense',
      type: 'line',
      data: yData.value,
      smooth: true,
      lineStyle: {
        width: 3,
      },
      areaStyle: {
        opacity: 0.15,
      },
    },
  ],
})

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption(getOption())
}

const handleResize = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

watch(
  [xData, yData],
  () => {
    if (!chartInstance) return
    console.log(yData)
    chartInstance.setOption(getOption())
  },
  {
    deep: true
  }
)
</script>

<style scoped></style>
