<script setup>
const { size } = defineProps(['size'])
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size || 24"
    :height="size || 24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M21 5v14l-8 -7z" />
    <path d="M10 5v14l-8 -7z" />
  </svg>
</template>
