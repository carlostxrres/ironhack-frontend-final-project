<script setup>
import IconArrowRight from "./icons/IconArrowRight.vue";
import IconTrash from "./icons/IconTrash.vue";
// import IconBaseline from './icons/IconBaseline.vue'
// import CheckboxComponent from "@/components/CheckboxComponent.vue";
import { ref, watch } from "vue";
import { useTaskStore } from "@/stores/task.js";
import useToasterStore from "@/stores/toaster.js";
import ToastComponent from "@/components/ToastComponent.vue";
import EditableTitle from "@/components/EditableTitle.vue";
import { getDisplayDate } from "@/services/datetime.js";

const { task } = defineProps(["task"]);

const taskStore = useTaskStore();
const toasterStore = useToasterStore();

const displayDate = ref(getDisplayDate(task.inserted_at));
const isComplete = ref(task.is_complete);

watch(
  () => isComplete.value,
  newValue => {
    taskStore.updateComplete(newValue, task, toasterStore)
  }
);

// watch(
//   () => task.inserted_at,
//   (newValue) => {
//     displayDate.value = getDisplayDate(newValue)
//   }
// )

const deleteTask = async () => {
  const confirmation = confirm(
    `Are you sure you want to delete the task "${task.title}"?`
  );
  if (!confirmation) {
    return;
  }

  const response = await taskStore.deleteTask({ id: task.id });
  if (response.error) {
    console.error("Error creating task:", response.error);
    toasterStore.error({
      title: "Task could not be deleted",
      text: response.error,
    });
    return;
  }

  toasterStore.success({
    title: "Task deleted",
    text: `The task "${task.title}" was deleted.`,
    timeout: 4000,
  });

  await taskStore.fetchTasks();
};
</script>

<template>
  <article :class="{ task: true, 'is-complete': isComplete }">
    <!-- to drag and drop and reorder, later
    <div class="icon-cell">
      <IconBaseline size="18" />
    </div>
    -->
    <!-- <CheckboxComponent value="isComplete" v-model="isComplete" /> -->
    <input type="checkbox" v-model="isComplete" />
    <div>
      <EditableTitle :title="task.title" :id="task.id" />
      <small>{{ displayDate }}</small>
    </div>
    <div class="icon-cell">
      <button class="button-icon button-tertiary" @click="deleteTask">
        <IconTrash size="18" />
      </button>
      <RouterLink :to="'./tasks/' + task.id">
        <IconArrowRight size="18" />
      </RouterLink>
    </div>
    <ToastComponent />
  </article>
</template>

<style>
/* */

.task {
  padding-block: 0.8rem;

  display: flex;
  align-items: center;

  border-bottom: 1px solid var(--color-text-3);
}

.task > * {
  height: 100%;
  padding: 0 0.8rem;
  transition: opacity var(--transition-fast);
}

.tasks-list > li:last-child .task {
  border-bottom: none;
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

.task.is-complete h4 {
  text-decoration: line-through;
  /* background: repeating-linear-gradient(
    315deg,
    transparent,
    transparent 10px,
    rgba(0, 0, 0, 0.1) 10px,
    rgba(0, 0, 0, 0.1) 20px
  ); */
}
</style>
