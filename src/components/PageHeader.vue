<script setup>
const date = new Date().toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  weekday: 'long'
})
</script>

<template>
  <header class="page-header">
    <h2>To do app</h2>
    <p>{{ date }}</p>
  </header>
</template>
