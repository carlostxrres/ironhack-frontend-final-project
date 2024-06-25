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
const inputRef = ref(null)

const updateTitle = async (newTitle) => {
  const response = await taskStore.updateTask({
    id: props.id,
    update: {
      title: newTitle
    }
  })

  if (response.error) {
    console.error('Error updating task:', response.error)
    toasterStore.error({
      title: 'Task could not be updated',
      text: response.error
    })
    return
  }

  toasterStore.success({
    title: 'Task updated',
    text: `The task "${newTitle}" was updated.`,
    timeout: 4000
  })

  taskStore.fetchTasks()
}

const toggleEditMode = () => {
  isEditing.value = !isEditing.value

  if (isEditing.value) {
    nextTick().then(() => inputRef.value.focus())
  } else {
    updateTitle(titleValue.value)
  }
}

const onEnterKey = (event) => {
  if (event.key === 'Enter') {
    toggleEditMode()
  }
}
</script>

<template>
  <div class="editable-title">
    <IconPencil
      size="16"
      :class="{ 'edit-icon': true, 'highlighted-icon': isEditing }"
      @click="toggleEditMode"
    />

    <input
      v-show="isEditing"
      ref="inputRef"
      type="text"
      class="title-input"
      v-model="titleValue"
      @blur="toggleEditMode"
      @keyup.enter="onEnterKey"
    />

    <h4 v-show="!isEditing" class="title-display">{{ titleValue }}</h4>
  </div>
</template>

<style>
.editable-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.edit-icon {
  cursor: pointer;
}

input[type='text'].title-input,
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
}

input[type='text'].title-input {
  width: 8rem;
  display: block;
  background: transparent;
  font-size: 1rem;
  background-color: transparent;
  padding: 0;
  font-style: italic;
  outline: none;
}

.highlighted-icon {
  color: var(--secondary-color-1);
}
</style>
