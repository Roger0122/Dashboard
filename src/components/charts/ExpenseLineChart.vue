<template>
  <div ref="chartRef" class="w-full h-80 bg-white rounded-xl shadow" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { expenses } from '@/data/expenses/index'

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const chartData = expenses.slice().sort((a, b) => a.dateKey.localeCompare(b.dateKey))

const xData = chartData.map((item) => item.dateKey)
const yData = chartData.map((item) => item.total)

const getOption = () => ({
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: xData,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Total Expense',
      type: 'line',
      data: yData,
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
  () => expenses,
  () => {
    chartInstance?.setOption(getOption())
  },
)
</script>

<style scoped></style>
