<script setup>

import IconArrowRight from './icons/IconArrowRight.vue'
import IconTrash from './icons/IconTrash.vue'
// import IconBaseline from './icons/IconBaseline.vue'
import CheckboxComponent from '@/components/CheckboxComponent.vue'
import { ref, watch } from 'vue'
const { task, isLast } = defineProps(['task', 'isLast'])

const getDisplayDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  return new Date(date).toLocaleDateString('en-US', options)
}

const displayDate = ref(getDisplayDate(task.inserted_at))
const isComplete = ref([])

watch(
  () => task.inserted_at,
  (newValue) => {
    displayDate.value = getDisplayDate(newValue)
  }
)

watch(
  () => isComplete.value,
  (newValue) => {
    console.log('isComplete', newValue)
  }
)
</script>

<template>
  <article :class="{ task: true, 'last-task': isLast }">
    <!-- to drag and drop and reorder, later
    <div class="icon-cell">
      <IconBaseline size="18" />
    </div>
    -->
    <CheckboxComponent value="isComplete" v-model="isComplete" />
    <div>
      <h4>{{ task.title }}</h4>
      <small>{{ displayDate }}</small>
    </div>
    <div class="icon-cell">
      <IconTrash size="18" />
      <RouterLink :to="task.id">
        <IconArrowRight size="18" />
      </RouterLink>
    </div>
  </article>
</template>

<style>
.task {
  padding-block: 0.8rem;

  display: flex;
  align-items: center;

  border-bottom: 1px solid var(--color-text-3);
}

.task > * {
  height: 100%;
  padding: 0 0.8rem;
}

.last-task {
  border-bottom: none;
}

.task h4 {
  margin: 0;
  line-height: 1rem;
  font-weight: 600;
}

.task > div:last-child {
  margin-left: auto;
}

.icon-cell {
  display: flex;
  align-items: center;
}

.icon-cell > * {
  display: flex;
  align-items: center;
}
</style>
