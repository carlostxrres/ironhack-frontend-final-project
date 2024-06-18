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

// const userStore = useUserStore()
// const toasterStore = useToasterStore()
const navigateToCreateTask = () => {
  router.push("create-task");
};
</script>
<template>
  <SimpleLayout>
    <template v-slot:header>
      <h1>Your tasks</h1>
    </template>
    <template v-slot:content>
      <!-- Tasks List -->
      <p v-if="!taskStore.tasks">You have no tasks yet.</p>
      <div v-else>
        <TaskList />
      </div>
      <!-- Tasks List: end -->

      <!-- Create New Task -->
      <label class="button-icon-wrap">
        <button class="button-icon" @click="navigateToCreateTask">
          <IconPlus strokeWidth="4" />
        </button>
        <span>Add new task</span>
      </label>
      <!-- Create New Task: end -->
    </template>
  </SimpleLayout>
</template>

<style>
.button-icon-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
</style>
