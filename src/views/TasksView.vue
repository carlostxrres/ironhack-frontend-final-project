<script setup>
// import { useUserStore } from '../stores/user'
// import { useToasterStore } from '@/stores/toaster.js'
// import router from '@/router/index.js'
import SimpleLayout from '@/components/SimpleLayout.vue'
import TaskList from '@/components/TaskList.vue'
import CreateTaskButton from '@/components/CreateTaskButton.vue'

import { RouterView } from 'vue-router'
import { getUser } from '@/services/session.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = getUser()
console.log(user)
if (!user) {
  router.push('/sign-in')
}

// const router = useRouter();
// const userStore = useUserStore()
// const toasterStore = useToasterStore()
// const navigateToCreateTask = () => {
//   router.push("create");
// };

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
