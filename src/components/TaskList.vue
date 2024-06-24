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
import FilterField from "@/components/FilterField.vue";
import CalendarComponent from "@/components/CalendarComponent.vue";
import TimerComponent from "@/components/TimerComponent.vue";

import { ref, computed } from "vue";
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
import { useTaskStore } from "@/stores/task.js";

const taskStore = useTaskStore();

const router = useRouter();

taskStore.fetchTasks();

const filterValue = ref("");
const filteredTasks = ref(taskStore.tasks);

const updateFilter = (event) => {
  const curatedFilterValue = filterValue.value.trim().toLowerCase();
  if (curatedFilterValue.length < 1) {
    return taskStore.tasks;
  }

  filteredTasks.value = taskStore.tasks.filter((task) =>
    task.title.toLowerCase().includes(curatedFilterValue)
  );
};

const taskCounts = computed(() => {
  const tasks = taskStore.tasks;
  const tasksNum = tasks.length;
  const areThereTasks = tasksNum > 0;
  const completed = tasks.filter((task) => task.is_complete);
  const incomplete = tasks.filter((task) => !task.is_complete);

  return {
    tasksNum,
    areThereTasks,
    completed,
    incomplete,
  };
});

const events = [
  {
    date: "2024-06-25",
    title: "Meeting with the boss",
    description: "Discuss the new project",
    color: "red",
    id: 1,
  },
  {
    date: "2024-06-25",
    title: "Another meeting with the boss",
    description: "What a day",
    color: "blue",
    id: 2,
  },
  {
    date: "2024-06-10",
    title: "Summer party",
    description: "Yeaaah",
    color: "green",
    id: 3,
  },
];
</script>

<template>
  <TimerComponent duration="300" />
  <!--
  <CalendarComponent :events="events" />
  -->

  <FilterField
    v-model="filterValue"
    @input="updateFilter"
    placeholder="Filter tasks..."
  />

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
