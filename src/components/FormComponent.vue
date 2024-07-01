<script setup>
const emit = defineEmits(["submitForm"]);

const submitForm = (event) => {
  emit("submitForm", event);
};
</script>

<template>
  <form @submit.prevent="submitForm" class="form">
    <slot></slot>
  </form>
</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 35rem;
}

.form fieldset {
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form label {
  display: grid;
  gap: 0.2rem;
  flex-grow: 1;
}

.form label.horizontal-label {
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 0.5rem;
}
.form .terms {
  font-size: 0.8rem;
  color: var(--color-text-3);
}

.form .terms input {
  width: 0.7rem;
  height: 0.7rem;
}

@media (min-width: 640px) {
  .form fieldset {
    flex-direction: row;
  }
}

.form-inline {
  flex-direction: row;
  justify-content: space-between;
}
</style>
