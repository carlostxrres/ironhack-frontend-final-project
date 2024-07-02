<script setup>
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import { ref, onMounted } from 'vue'
import router from '@/router/index.js'

const props = defineProps({
  title: {
    type: String,
    required: false
  },
  onOpen: {
    type: Function,
    required: false
  }
})

const dialog = ref(null)

onMounted(() => {
  dialog.value.showModal()
  // dialog.value.style.maxHeight = "100dvh";
  // dialog.value.style.minHeight = "40dvh";
  dialog.value.classList.add('open')

  if (props.onOpen) {
    props.onOpen()
  }

  // dialog.value.addEventListener("close", () => {
  //   // to do: add some closing animation here
  //   router.push({ path: "/tasks" });
  // });
})
const closeDialog = () => {
  dialog.value.addEventListener('transitionend', (transitionEvent) => {
    if (transitionEvent.propertyName === 'bottom') {
      dialog.value.close()
      router.push({ path: '/tasks' })
    }
  })
  dialog.value.classList.remove('open')
}
</script>
<template>
  <dialog ref="dialog" class="dialog">
    <header>
      <button class="icon-button button-tertiary" @click="closeDialog">
        <IconArrowLeft />
      </button>
      <h2 v-if="props.title">{{ props.title }}</h2>
    </header>
    <slot />
  </dialog>
</template>

<style>
.dialog {
  top: auto;
  right: auto;
  bottom: -20rem;
  left: 50%;
  transform: translateX(-50%);

  border: none;

  position: fixed;
  box-shadow: var(--box-shadow-small);
  border-radius: var(--border-radius-big);
  padding: 2rem;
  min-width: 20rem;
  transition: bottom var(--transition-slow);
}

.dialog.open {
  bottom: 1rem;
}

.dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
