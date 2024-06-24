<script setup>
// import { useUserStore } from '../stores/user'
// import { useToasterStore } from '@/stores/toaster.js'
// import router from '@/router/index.js'
import PageHeader from "@/components/PageHeader.vue";
import SimpleLayout from "@/components/SimpleLayout.vue";
import TaskComponent from "@/components/TaskComponent.vue";
import IconRefresh from "@/components/icons/IconRefresh.vue";
import IconSortAscending from "@/components/icons/IconSortAscending.vue";
import TaskList from "@/components/TaskList.vue";
import CreateTaskButton from "@/components/CreateTaskButton.vue";

import { ref } from "vue";
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";

const router = useRouter();
// const userStore = useUserStore()
// const toasterStore = useToasterStore()
const navigateToCreateTask = () => {
  router.push("create-task");
};

// to do: if no user in localStorage, just go redirect to sign-in view
</script>

<template>
  <SimpleLayout>
    <template v-slot:header>
      <h1>Your tasks</h1>
      <!-- to do: put the nav bar here in the header so it's sticky -->
    </template>
    <template v-slot:content>
      <TaskList />
    </template>
    <template v-slot:floating>
      <CreateTaskButton />
      <RouterView />
    </template>
  </SimpleLayout>
</template>

<style>
.new-task-button {
  margin-block: 1rem;
}

.button-icon-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
</style>
