<script setup>
import { ref, defineProps, nextTick } from 'vue'
import IconPencil from './icons/IconPencil.vue'
import { useTaskStore } from '@/stores/task.js'
import useToasterStore from '@/stores/toaster.js'

const taskStore = useTaskStore()
const toasterStore = useToasterStore()

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})

const isEditing = ref(false)
const titleValue = ref(props.title)
const titleInDatabase = ref(props.title)
const titleRef = ref(null)

const updateTitle = async (newTitle) => {
  const response = await taskStore.updateTask({
    id: props.id,
    update: {
      title: newTitle
    }
  })

  if (response.error) {
    console.error('Error renaming task:', response.error)
    toasterStore.error({
      title: `Your task could not be renamed to "${newTitle}"`,
      text: response.error
    })
    return
  }

  titleInDatabase.value = newTitle
  toasterStore.success({
    title: 'Task renamed',
    text: `Your task was renamed to "${newTitle}".`,
    timeout: 4000
  })

  taskStore.fetchTasks()
}

const handleEdit = () => {
  isEditing.value = false
  const newTitle = event.target.innerText.trim()
  if (newTitle && newTitle !== titleInDatabase.value) {
    titleValue.value = newTitle
    updateTitle(newTitle)
  } else {
    titleValue.value = titleInDatabase.value
  }
}

const startEditing = () => {
  isEditing.value = true
  nextTick(() => titleRef.value.focus())
}
</script>

<template>
  <div class="editable-wrap">
    <button
      :class="{
        'edit-button': true,
        'button-active': isEditing
      }"
      @click="startEditing"
    >
      <IconPencil size="16" />
    </button>
    <h4
      ref="titleRef"
      class="title-display"
      :contentEditable="isEditing"
      :class="{ editable: isEditing }"
      @blur="handleEdit"
      @keyup.enter.prevent="handleEdit"
    >
      {{ titleValue }}
    </h4>
  </div>
</template>

<style>
.edit-button {
  opacity: 0;
  transition: opacity var(--transition-fast);
  padding: var(--padding-block);
  aspect-ratio: 1;
  position: absolute;
  transform: translateX(calc(-100% - var(--padding-inline)));
}
.editable-wrap:hover .edit-button {
  opacity: 1;
}
.editable-wrap {
  display: flex;
  align-items: center;
  --padding-inline: 0.4rem;
  --padding-block: 0.2rem;
}
.title-display {
  line-height: 1.5rem;
  color: var(--primary-color-1);
  font-size: 1rem;
  margin: 0;
  font-weight: 600;

  border: none;
  outline: none;
  padding: 0;
  background: none;

  padding: var(--padding-block) var(--padding-inline);
  border-radius: var(--border-radius-small);
  transform: translateX(calc(-1 * var(--padding-inline)));

  transition: background-color var(--transition-fast);
  z-index: 0;
}

.title-display.editable {
  font-style: italic;
  background-color: var(--color-background);
}

.button-active {
  border-color: var(--color-primary-1);
}
</style>
