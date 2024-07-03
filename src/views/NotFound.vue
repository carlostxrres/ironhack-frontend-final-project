<script setup>
import SimpleLayout from '@/components/SimpleLayout.vue'
import IconMoodPuzzled from '@/components/icons/IconMoodPuzzled.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { path } = router.currentRoute.value
</script>

<template>
  <SimpleLayout>
    <template v-slot:header> Oops... </template>
    <template v-slot:content>
      <div class="asdasdasdasd">
        <div>
          <p>
            <span class="big">4</span>
            <IconMoodPuzzled size="100" strokeWidth="3" />
            <span class="big">4</span>
          </p>
          <h1>Page not found</h1>
        </div>
        <p>
          The requested URL <span class="discreet-text">{{ path }}</span> was not found in the
          server
        </p>
        <RouterLink to="/tasks" class="icon-entry">
          <IconArrowLeft />
          <span>Go see your tasks</span>
        </RouterLink>
      </div>
    </template>
  </SimpleLayout>
</template>

<style>
.big {
  font-size: 8rem;
  font-weight: 600;
}

.asdasdasdasd {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
}

.discreet-text {
  color: var(--color-text-4);
}
</style>
