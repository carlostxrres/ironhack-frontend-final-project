<script setup>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import ToastComponent from "@/components/ToastComponent.vue";
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
    <div class="floating">
      <slot name="floating"></slot>
    </div>
    <PageFooter class="page-footer" />
    <ToastComponent />
  </div>
</template>

<style>
.simple-layout {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  --margin-inline: 2rem;
  --margin-block: 2rem;
  --section-bg-color: white;
}

.page-header,
.page-footer {
  padding: var(--margin-block) var(--margin-inline);

  align-self: normal;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-footer {
  margin-top: auto;
  border-top: 1px solid #ccc;
}

.section {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: hotpink transparent;
  background-color: var(--section-bg-color);
  margin: 0 var(--margin-inline);
  border-radius: var(--border-radius-small);
  box-shadow: var(--box-shadow-big);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: max-content;
}

.section-header,
.section-content,
.floating {
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
