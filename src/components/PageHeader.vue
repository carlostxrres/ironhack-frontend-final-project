<script setup>
// Display current date
// Display email of the user

const date = new Date().toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
});

</script>

<template>
  <header class="page-header">
    <h1>To do app</h1>
    <p>{{ date }}</p>
  </header>
</template>

<style></style>
