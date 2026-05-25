<template>
  <div
    class="bg-white rounded-2xl shadow p-5 space-y-2"
  >
    <p class="text-sm text-gray-500">
      {{ title }}
    </p>

    <h2 class="text-2xl font-bold">
      {{ value }}
    </h2>

    <p
      v-if="subtitle"
      class="text-sm text-gray-400"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  subtitle?: string
}>()
</script>

<style scoped></style>