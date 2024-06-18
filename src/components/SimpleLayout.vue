<script setup>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
</script>

<template>
  <div class="simple-layout">
    <PageHeader class="page-header" />
    <section class="section">
      <header class="section-header">
        <slot name="header"></slot>
      </header>
      <main class="section-content">
        <slot name="content"></slot>
      </main>
    </section>
    <PageFooter class="page-footer" />
  </div>
</template>

<style>
.simple-layout {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  --margin-inline: 2rem;
  --margin-block: 1rem;
  --section-bg-color: white;
}

.page-header,
.page-footer {
  padding: var(--margin-block) var(--margin-inline);
}

.page-footer {
  margin-top: auto;
}

.section {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: hotpink blue;
  background-color: var(--section-bg-color);
  margin: 0 var(--margin-inline);
  border-radius: var(--border-radius-small);
  box-shadow: var(--box-shadow-big);
  position: relative;
  align-self: center;
}

.section-header,
.section-content {
  padding-inline: var(--margin-inline);
}

.section-header {
  padding-top: var(--margin-block);
  position: sticky;
  top: 0;
  background-color: var(--section-bg-color);
}

.section-content {
  padding-bottom: var(--margin-block);
}
</style>
