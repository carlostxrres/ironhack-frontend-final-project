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
    <path d="M4 3h16" />
    <path d="M4 9h16" />
    <path d="M4 15h16" />
    <path d="M4 21h16" />
  </svg>
</template>
