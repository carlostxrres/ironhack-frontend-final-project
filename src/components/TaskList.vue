<script setup>
import TaskComponent from '@/components/TaskComponent.vue'
import FilterField from '@/components/FilterField.vue'

import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/task.js'

const taskStore = useTaskStore()

taskStore.fetchTasks()

const filterValue = ref('')
const filteredTasks = ref(taskStore.tasks)

const updateFilter = () => {
  const curatedFilterValue = filterValue.value.trim().toLowerCase()
  if (curatedFilterValue.length < 1) {
    return taskStore.tasks
  }

  filteredTasks.value = taskStore.tasks.filter((task) =>
    task.title.toLowerCase().includes(curatedFilterValue)
  )
}

const taskCounts = computed(() => {
  const tasks = taskStore.tasks
  const tasksNum = tasks.length
  const areThereTasks = tasksNum > 0
  const completed = tasks.filter((task) => task.is_complete)
  const incomplete = tasks.filter((task) => !task.is_complete)

  return {
    tasksNum,
    areThereTasks,
    completed,
    incomplete
  }
})
</script>

<template>
  <FilterField v-model="filterValue" @input="updateFilter" placeholder="Filter tasks..." />

  <!--
  <div class="actions-bar" v-if="taskCounts.areThereTasks">
    <div>
      <button class="button-icon button-secondary">
        <IconSortAscending size="16" strokeWidth="3" />
        to do: add tooltip
      </button>
      <button @click="taskStore.fetchTasks()" class="button-icon button-secondary">
        <IconRefresh size="16" strokeWidth="3" />
         to do: add tooltip 
      </button>
    </div>
  </div>
  -->
  <div class="counts-sentence">
    <p v-if="!taskCounts.areThereTasks">No tasks yet.</p>
    <p v-else-if="taskCounts.incomplete.length">
      {{ taskCounts.incomplete.length }} to be completed
    </p>
    <p v-else>Congrats, all tasks are complete!</p>
  </div>

  <ul>
    <li v-for="(task, index) in filteredTasks" :key="task.id">
      <TaskComponent :task="task" :isLast="index + 1 >= filteredTasks.length" />
    </li>
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
/*.actions-bar > *:last-child {
  margin-left: auto;
  display: flex;
  gap: 0.3rem;
}*/

.counts-sentence {
  font-size: 0.8rem;
  color: var(--color-text-3);
  margin-top: 0.5rem;
}
</style>
