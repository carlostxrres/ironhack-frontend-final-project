<script setup>
const { size, strokeWidth } = defineProps(['size', 'strokeWidth'])
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size || 24"
    :height="size || 24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth || 2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 6l9 0" />
    <path d="M4 12l7 0" />
    <path d="M4 18l7 0" />
    <path d="M15 15l3 3l3 -3" />
    <path d="M18 6l0 12" />
  </svg>
</template>
