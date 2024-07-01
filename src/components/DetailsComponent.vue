<script setup>
import IconChevronDown from "@/components/icons/IconChevronDown.vue";
</script>

<template>
  <details class="details">
    <summary class="details-summary">
      <IconChevronDown size="18" />
      <slot name="summary" />
    </summary>
    <div class="details-content">
      <slot name="content" />
    </div>
  </details>
</template>

<style>
.details {
  border: 1px solid var(--primary-color-2);
  border-radius: var(--border-radius-small);
}
.details-summary,
.details-content {
  padding: 0.5rem 1rem;
}
.details-summary {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  background-color: var(--primary-color-2);
  cursor: pointer;
  user-select: none;
  transition: filter var(--transition-fast);
}

.details-summary:hover {
  filter: brightness(.95);
}

details > .details-summary svg {
  transition: transform var(--transition-slow);
}

details[open] > .details-summary svg {
  transform: scaleY(-1);
}
</style>
