<script setup>
import SidePresentation from '@/components/SidePresentation.vue'
</script>

<template>
  <div class="split-layout">
    <SidePresentation />
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<style>
.split-layout {
  display: flex;
  min-height: 100vh;
}

.split-layout > * {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.split-layout main {
  flex: 2;
  position: relative;
  background-color: var(--color-background);
}
</style>
