<script setup>
import { useRoute } from 'vue-router'
import { useTaskStore } from '../stores/task.js'
import { ref, onMounted, watch } from 'vue'
import TimerComponent from '@/components/TimerComponent.vue'

const route = useRoute()
const taskStore = useTaskStore()
const { taskId } = route.params

const task = ref(null)

const getNewTaskData = async () => {
  const { taskId } = route.params

  await taskStore.fetchTasks()
  const targetTask = taskStore.tasks.find((t) => t.id == taskId)
  if (!targetTask) {
    console.error('Task not found:', taskId)
    // to do: show error in UI
    return
  }

  console.log(targetTask)
  task.value = targetTask
}

onMounted(getNewTaskData)
watch(() => route.params.taskId, getNewTaskData)

// {
//   "id": 78,
//   "user_id": "ad80bd2a-cdcb-4dff-b21f-a237813ce53e",
//   "title": "Poner la lavadora",
//   "is_complete": false,
//   "inserted_at": "2024-06-25T17:21:13.91057+00:00"
// }

// PONER LA LAVADORA
// [x] Completed
// Set timer: mins 1 2 5 10 20
//            hour 1 2
</script>

<template>
  <div>task id: {{ taskId }}</div>

  <TimerComponent duration="300" />
</template>

<style></style>
