<script setup>
import SimpleLayout from '@/components/SimpleLayout.vue'
import TaskList from '@/components/TaskList.vue'
import CreateTaskButton from '@/components/CreateTaskButton.vue'

import { RouterView } from 'vue-router'
import { getUser } from '@/services/session.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = getUser()

// If no user, just go redirect to sign-in view
if (!user) {
  router.push('/sign-in')
}
</script>

<template>
  <SimpleLayout>
    <template v-slot:header>
      <h1>Your tasks</h1>
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
.button-icon-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
</style>
