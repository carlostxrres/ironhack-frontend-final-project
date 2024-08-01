<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="hr-container">
    <hr class="hr" v-if="!text" />
    <div v-else class="hr-with-text">
      <small class="hr-text">{{ text }}</small>
    </div>
  </div>
</template>

<style scoped>
.hr {
  border: none;
  border-top: 1px dotted var(--color-text-4);
  margin-block: 1rem;
  width: 100%;
}

.hr-container {
  display: flex;
  align-items: center;
  margin-block: 1rem;
}

.hr-with-text {
  display: flex;
  align-items: center;
  width: 100%;
}

.hr-text {
  color: #888;
  text-align: center;
  margin: 0 1rem;
  white-space: nowrap;
}

.hr-with-text::before,
.hr-with-text::after {
  content: "";
  flex: 1 1;
  border-top: 1px dotted var(--color-text-4);
}

.hr-with-text::before {
  margin-right: 1rem;
}

.hr-with-text::after {
  margin-left: 1rem;
}
</style>
