<script setup>
import IconArrowRight from './icons/IconArrowRight.vue'
import IconTrash from './icons/IconTrash.vue'
// import IconBaseline from './icons/IconBaseline.vue'
// import CheckboxComponent from "@/components/CheckboxComponent.vue";
import { ref, watch } from 'vue'
import { useTaskStore } from '@/stores/task.js'
import useToasterStore from '@/stores/toaster.js'
import ToastComponent from '@/components/ToastComponent.vue'

const { task, isLast } = defineProps(['task', 'isLast'])

const taskStore = useTaskStore()
const toasterStore = useToasterStore()

const getDisplayDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  return new Date(date).toLocaleDateString('en-US', options)
}

const displayDate = ref(getDisplayDate(task.inserted_at))
const isComplete = ref(task.is_complete)

watch(
  () => isComplete.value,
  async (newValue) => {
    const response = await taskStore.updateTask({
      id: task.id,
      update: {
        is_complete: newValue
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
      text: `The task "${task.title}" was updated.`,
      timeout: 4000
    })

    taskStore.fetchTasks()
  }
)

// watch(
//   () => task.inserted_at,
//   (newValue) => {
//     displayDate.value = getDisplayDate(newValue)
//   }
// )

const deleteTask = async () => {
  const confirmation = confirm(`Are you sure you want to delete the task "${task.title}"?`)
  if (!confirmation) {
    return
  }

  const response = await taskStore.deleteTask({ id: task.id })
  if (response.error) {
    console.error('Error creating task:', response.error)
    toasterStore.error({
      title: 'Task could not be deleted',
      text: response.error
    })
    return
  }

  toasterStore.success({
    title: 'Task deleted',
    text: `The task "${task.title}" was deleted.`,
    timeout: 4000
  })

  await taskStore.fetchTasks()
}
</script>

<template>
  <article :class="{ task: true, 'last-task': isLast }">
    <!-- to drag and drop and reorder, later
    <div class="icon-cell">
      <IconBaseline size="18" />
    </div>
    -->
    <!-- <CheckboxComponent value="isComplete" v-model="isComplete" /> -->
    <input type="checkbox" v-model="isComplete" />
    <div>
      <h4>{{ task.title }}</h4>
      <small>{{ displayDate }}</small>
    </div>
    <div class="icon-cell">
      <button class="button-icon button-tertiary" @click="deleteTask">
        <IconTrash size="18" />
      </button>
      <RouterLink :to="task.id">
        <IconArrowRight size="18" />
      </RouterLink>
    </div>
    <ToastComponent />
  </article>
</template>

<style>
.task {
  padding-block: 0.8rem;

  display: flex;
  align-items: center;

  border-bottom: 1px solid var(--color-text-3);
}

.task > * {
  height: 100%;
  padding: 0 0.8rem;
}

.last-task {
  border-bottom: none;
}

.task h4 {
  margin: 0;
  line-height: 1rem;
  font-weight: 600;
}

.task > div:last-child {
  margin-left: auto;
}

.icon-cell {
  display: flex;
  align-items: center;
}

.icon-cell > * {
  display: flex;
  align-items: center;
}
</style>
