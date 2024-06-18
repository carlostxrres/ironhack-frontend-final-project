<script setup>
// import { useUserStore } from '../stores/user'
// import { useToasterStore } from '@/stores/toaster.js'
// import router from '@/router/index.js'
import PageHeader from "@/components/PageHeader.vue";
import SimpleLayout from "@/components/SimpleLayout.vue";
import TaskComponent from "@/components/TaskComponent.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconRefresh from "@/components/icons/IconRefresh.vue";
import IconSortAscending from "@/components/icons/IconSortAscending.vue";
import TaskList from "@/components/TaskList.vue";

import { ref } from "vue";
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
import { useTaskStore } from "@/stores/task.js";

const taskStore = useTaskStore();

const router = useRouter();

taskStore.fetchTasks();
const taskCounts = ref({
  total: taskStore.tasks,
  completed: taskStore.tasks.filter((task) => task.is_complete),
  incomplete: taskStore.tasks.filter((task) => !task.is_complete),
});
</script>

<template>
  <div class="actions-bar">
    <input type="text" placeholder="Search tasks" />
    <div>
      <button class="button-icon button-secondary">
        <IconSortAscending size="16" strokeWidth="3" />
        <!-- to do: add tooltip -->
      </button>
      <button @click="taskStore.fetchTasks()" class="button-icon button-secondary">
        <IconRefresh size="16" strokeWidth="3" />
        <!-- to do: add tooltip -->
      </button>
    </div>
  </div>
  <div class="counts-sentence">
    <p v-if="taskCounts.incomplete.length">
      {{ taskCounts.incomplete.length }} to be completed
    </p>
    <p v-else>Congrats, all tasks are complete!</p>
  </div>

  <ul>
    <li v-for="(task, index) in taskStore.tasks" :key="task.id">
      <TaskComponent :task="task" :isLast="index + 1 >= taskStore.tasks.length" />
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
}
.actions-bar > *:last-child {
  margin-left: auto;
  display: flex;
  gap: 0.3rem;
}

.counts-sentence {
  font-size: 0.8rem;
  color: var(--color-text-3);
  text-align: end;
  margin-top: 0.5rem;
}
</style>
