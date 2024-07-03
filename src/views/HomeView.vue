<script setup>
import { onMounted } from 'vue'
import { isLoggedIn } from '@/services/session.js'
import router from '@/router/index.js'
import IconLoader from '@/components/icons/IconLoader.vue'

onMounted(() => {
  if (isLoggedIn()) {
    router.push('/tasks')
  } else {
    router.push('/sign-in')
  }
})
</script>

<template>
  <main class="centered">
    <h1>Welcome!</h1>
    <p>You should now be redirected somewhere...</p>
    <IconLoader class="spinning" size="48" />
  </main>
</template>

<style>
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
}
.spinning {
  animation: spin 800ms linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
