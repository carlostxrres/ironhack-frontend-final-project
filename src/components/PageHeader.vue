<script setup>
import IconSword from '@/components/icons/IconSword.vue'
const date = new Date().toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  weekday: 'long'
})
</script>

<template>
  <header class="page-header">
    <span class="icon-entry">
      <IconSword size="28" style="color: var(--primary-color-1)" />
      <h2>To do app</h2>
    </span>
    <p>{{ date }}</p>
  </header>
</template>
