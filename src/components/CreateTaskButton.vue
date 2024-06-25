<script setup>
import IconPlus from '@/components/icons/IconPlus.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isCreatingTask = computed(() => route.path.includes('create'))
</script>
<template>
  <RouterLink to="./tasks/create" class="discreet-anchor" :class="{ disabled: isCreatingTask }">
    <label class="button-icon-wrap new-task-button">
      <button class="button-icon button-primary">
        <IconPlus strokeWidth="4" />
      </button>
      <span>Add new task</span>
    </label>
  </RouterLink>
</template>
