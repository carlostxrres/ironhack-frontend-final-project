<script setup>
import PageHeader from "@/components/PageHeader.vue";
import SimpleLayout from "@/components/SimpleLayout.vue";
</script>

<template>
  <SimpleLayout>
    <template v-slot:header>
      <h1>Haw are yu?</h1>
    </template>
    <template v-slot:content>
      <h2>I'm fines, zank yo</h2>
      <p>Gud ta hear</p>
    </template>
  </SimpleLayout>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
