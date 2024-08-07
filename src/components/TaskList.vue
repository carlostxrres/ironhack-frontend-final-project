<script setup>
import TaskComponent from '@/components/TaskComponent.vue'
import FilterField from '@/components/FilterField.vue'
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/task.js'

const taskStore = useTaskStore()

taskStore.fetchTasks()

const filterValue = ref('')

const filteredTasks = computed(() => {
  const curatedFilterValue = filterValue.value.trim().toLowerCase()
  if (!curatedFilterValue) {
    return taskStore.tasks
  }

  return taskStore.tasks.filter((task) => task.title.toLowerCase().includes(curatedFilterValue))
})

const taskCounts = computed(() => {
  const tasks = taskStore.tasks
  const tasksNum = tasks.length
  const completed = tasks.filter((task) => task.is_complete).length
  const incomplete = tasksNum - completed

  return {
    tasksNum,
    completed,
    incomplete
  }
})

const getPluralSuffix = (num) => {
  return num === 1 ? '' : 's'
}
</script>

<template>
  <FilterField v-model="filterValue" placeholder="Filter tasks..." />

  <p class="counts-sentence">
    <span v-if="!taskCounts.tasksNum">No tasks yet.</span>
    <span v-else>
      <strong>{{ taskCounts.tasksNum }}</strong>
      task{{ getPluralSuffix(taskCounts.tasksNum) }}
    </span>

    <span v-if="!taskCounts.tasksNum"></span>
    <span v-else-if="taskCounts.incomplete">
      <strong>{{ taskCounts.incomplete }}</strong>
      to be completed
    </span>
    <span v-else>All complete!</span>
  </p>

  <ul class="tasks-list">
    <TaskComponent v-for="task in filteredTasks" :key="task.id" :task="task" />
  </ul>
</template>

<style>
.main {
  display: flex;
  flex-direction: column;
  margin-inline: auto;
  align-items: center;
}

.tasks-title {
  align-self: start;
}
.actions-bar {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  justify-content: space-between;
  margin-block: 0.5rem;
}

.counts-sentence {
  font-size: 0.8rem;
  color: var(--color-text-3);
  display: flex;
  justify-content: space-between;
}
</style>
