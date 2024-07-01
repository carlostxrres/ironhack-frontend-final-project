<script setup>
import useToasterStore from "@/stores/toaster.js";
import IconError from "@/components/icons/IconError.vue";
import IconCheck from "@/components/icons/IconCheck.vue";

const toastStore = useToasterStore();
</script>

<template>
  <Transition name="toast">
    <div v-if="toastStore.toasts.length" class="toaster-wrap">
      <TransitionGroup name="toast" tag="ul">
        <li
          v-for="toast in toastStore.toasts"
          :class="['toast', toast.status]"
          :key="toast.text"
        >
          <IconError v-if="toast.status === 'error'" class="toast-icon" />
          <IconCheck v-else-if="toast.status === 'success'" class="toast-icon" />
          <h4>{{ toast.title }}</h4>
          <p class="toast-text">{{ toast.text }}</p>
          <button @click="toastStore.removeToast(toast.id)">&times;</button>
        </li>
      </TransitionGroup>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: transform var(--transition-slow), opacity var(--transition-slow);
}

.toaster-wrap ul {
  position: fixed;
  inset: 1rem 1rem auto 1rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast {
  --color: black;
  --background-color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 0.3rem;
  border: 1px solid transparent;
  background-color: white;
  padding: 1rem;
  border-color: var(--color);
  color: var(--color);
}

.toast.success {
  --color: green;
  --background-color: #e2f4e2;
}

.toast.warning {
  --color: orange;
}

.toast.error {
  --color: #960e0e;
  --background-color: #fcd0d0;
}

.toast-icon {
  width: 1.8rem;
  aspect-ratio: 1/1;
}

.toast-text {
  font-weight: 600;
}

.toast {
  display: grid;
  grid-template-areas:
    "icon titl close"
    ".    text text";
  grid-template-columns: auto 1fr auto;
  gap: 0 0.5rem;
  border: 1px solid var(--color);
  background-color: var(--background-color);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  position: relative;
}

.toast > *:nth-child(1) {
  grid-area: icon;
}
.toast > *:nth-child(2) {
  grid-area: titl;
  font-weight: bold;
}
.toast > *:nth-child(3) {
  grid-area: text;
}
.toast > button {
  grid-area: close;

  color: var(--color);

  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;

  transition: filter 100ms;
}
.toast > button:hover {
  filter: brightness(1.4);
}
</style>
