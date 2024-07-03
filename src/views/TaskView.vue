<script setup>
import { useRoute } from 'vue-router'
import { useTaskStore } from '../stores/task.js'
import useToasterStore from '@/stores/toaster.js'
import { ref, onMounted, watch } from 'vue'
import TimerComponent from '@/components/TimerComponent.vue'
import DialogComponent from '@/components/DialogComponent.vue'
import FormComponent from '@/components/FormComponent.vue'
import EditableTitle from '@/components/EditableTitle.vue'
import { getDisplayDate, getTimeAgo } from '@/services/datetime.js'
import HorizontalRule from '@/components/HorizontalRule.vue'
import DetailsComponent from '@/components/DetailsComponent.vue'
import CalendarComponent from '@/components/CalendarComponent.vue'

const route = useRoute()
const taskStore = useTaskStore()
const toasterStore = useToasterStore()

const task = ref(null)
const isComplete = ref(null)
const isTimerOn = ref(false)
const timerDuration = ref(null)
const inputTimerMinutes = ref(null)

const calendarEvents = ref([])

const getNewTaskData = async (a) => {
  const { taskId } = route.params
  console.log('navigating to', a)
  await taskStore.fetchTasks()
  const targetTask = taskStore.tasks.find((t) => t.id == taskId)
  if (!targetTask) {
    console.error('Task not found:', taskId)
    // to do: show error in UI
    return
  }

  task.value = targetTask
  isComplete.value = targetTask.is_complete

  calendarEvents.value = taskStore.tasks.map((t) => {
    const isTargetTask = t.id == taskId
    const opacity = t.is_complete ? 0.4 : 0.2
    const completedText = t.is_complete ? 'Completed' : 'Incomplete'
    return {
      id: t.id,
      color: isTargetTask ? 'var(--secondary-color-1)' : `rgba(0, 0, 0, ${opacity})`,
      date: t.inserted_at,
      title: `${t.title} - ${completedText}`
    }
  })
}

onMounted(getNewTaskData)
watch(() => route.params.taskId, getNewTaskData)

watch(
  () => isComplete.value,
  async (newValue, oldValue) => {
    const isInitial = oldValue === null
    const didChange = newValue !== oldValue

    if (!isInitial && didChange) {
      await taskStore.updateComplete(newValue, task.value, toasterStore)
      taskStore.fetchTasks()
    }
  }
)

const toggleTimer = () => {
  isTimerOn.value = !isTimerOn.value
  const inputMethod = isTimerOn.value ? 'blur' : 'focus'
  inputTimerMinutes.value[inputMethod]()
}
</script>

<template>
  <DialogComponent :title="task?.title || 'Task'">
    <div v-if="task">
      <small>Created {{ getTimeAgo(task.inserted_at) }}</small>
      <EditableTitle @titleUpdated="getNewTaskData" :title="task.title" :id="task.id" />
      <label class="icon-entry">
        <input type="checkbox" v-model="isComplete" @change="updateTask" />
        <span>{{ isComplete ? 'Completed' : 'Incomplete' }}</span>
      </label>
    </div>

    <div v-else>
      <p>Loading...</p>
      <p>Task ID: ...</p>
      <p>Created on: ...</p>
    </div>

    <HorizontalRule />

    <div class="task-tools-section">
      <DetailsComponent>
        <template v-slot:summary>Timer</template>
        <template v-slot:content>
          <FormComponent @submitForm="toggleTimer" class="form-inline">
            <input
              type="number"
              placeholder="Minutes"
              min="0"
              max="1440"
              v-model="timerDuration"
              :class="{ disabled: isTimerOn }"
              ref="inputTimerMinutes"
            />
            <button type="submit" class="button-secondary" :class="{ disabled: timerDuration < 1 }">
              {{ isTimerOn ? 'Remove' : 'Set' }} timer
            </button>
          </FormComponent>

          <Transition name="timer">
            <TimerComponent :duration="timerDuration" :startOnMount="true" v-if="isTimerOn" />
          </Transition>
        </template>
      </DetailsComponent>

      <DetailsComponent>
        <template v-slot:summary>Calendar</template>
        <template v-slot:content v-if="task">
          <small>Created on {{ getDisplayDate(task.inserted_at) }}</small>
          <CalendarComponent :events="calendarEvents" />
        </template>
      </DetailsComponent>
    </div>
  </DialogComponent>
</template>

<style>
.timer-enter-from,
.timer-leave-to {
  /* transform: translateY(100%); */
  opacity: 0;
}

.timer-enter-active,
.timer-leave-active {
  transition:
    transform var(--transition-slow),
    opacity var(--transition-slow);
}

.task-tools-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
