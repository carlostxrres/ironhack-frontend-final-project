<script setup>
import { useRoute } from "vue-router";
import { useTaskStore } from "../stores/task.js";
import useToasterStore from "@/stores/toaster.js";
import { ref, onMounted, watch } from "vue";
import TimerComponent from "@/components/TimerComponent.vue";
import ToastComponent from "@/components/ToastComponent.vue";
import DialogComponent from "@/components/DialogComponent.vue";
import FormComponent from "@/components/FormComponent.vue";
import EditableTitle from "@/components/EditableTitle.vue";
import { getDisplayDate, getTimeAgo } from "@/services/datetime.js";
import HorizontalRule from "@/components/HorizontalRule.vue";
import DetailsComponent from "@/components/DetailsComponent.vue";
import CalendarComponent from "@/components/CalendarComponent.vue";

const route = useRoute();
const taskStore = useTaskStore();
const toasterStore = useToasterStore();
const { taskId } = route.params;

const task = ref(null);
const isComplete = ref(null);
const isTimerOn = ref(false);
const timerDuration = ref(null);
const inputTimerMinutes = ref(null);

const calendarEvents = ref([])

// const events = [
//   {
//     id: 1,
//     color: "blue",
//     date: "2024-06-25",
//     title: "Task created",
//   },
// ];

const getNewTaskData = async () => {
  await taskStore.fetchTasks();
  const targetTask = taskStore.tasks.find((t) => t.id == taskId);
  if (!targetTask) {
    console.error("Task not found:", taskId);
    // to do: show error in UI
    return;
  }

  task.value = targetTask;
  isComplete.value = targetTask.is_complete;

  calendarEvents.value = taskStore.tasks.map(t => {
    const isTargetTask = t.id == taskId
    return {
      id: t.id,
      color: isTargetTask ? "var(--secondary-color-1)" : "#aaa",
      date: t.inserted_at,
      title: t.title,
    }
  })
};

onMounted(getNewTaskData);
watch(() => route.params.taskId, getNewTaskData);

watch(
  () => isComplete.value,
  (newValue, oldValue) => {
    const isInitial = oldValue === null;
    const didChange = newValue !== oldValue;

    if (!isInitial && didChange) {
      taskStore.updateComplete(newValue, task.value, toasterStore);
    }
  }
);

const setTimer = (event) => {
  console.log(event);
  isTimerOn.value = true;
};

const toggleTimer = () => {
  isTimerOn.value = !isTimerOn.value;
  const inputMethod = isTimerOn.value ? "blur" : "focus";
  console.log(inputMethod);
  inputTimerMinutes.value[inputMethod]();
};

// taskview object example:
// {
//   "id": 78,
//   "user_id": "ad80bd2a-cdcb-4dff-b21f-a237813ce53e",
//   "title": "Poner la lavadora",
//   "is_complete": false,
//   "inserted_at": "2024-06-25T17:21:13.91057+00:00"
// }

///

// PONER LA LAVADORA
// [x] Completed
// Set timer: mins 1 2 5 10 20
//            hour 1 2
</script>

<script setup></script>
<template>
  <DialogComponent title="Create task" :onOpen="focusOnInput">
    <div>task id: {{ taskId }}</div>

    <TimerComponent duration="300" />
  </DialogComponent>

  <div style="position: relative">
    <ToastComponent />
  </div>
</template>
