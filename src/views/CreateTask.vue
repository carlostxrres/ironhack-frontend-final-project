<script setup>
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import FormComponent from '@/components/FormComponent.vue'
import { useTaskStore } from '@/stores/task.js'
import useToasterStore from '@/stores/toaster.js'
import { validateForm, errorUi } from '@/services/validateForm.js'
import { ref, onMounted, computed } from 'vue'
import router from '@/router/index.js'
import ToastComponent from '@/components/ToastComponent.vue'

const toasterStore = useToasterStore()
const taskStore = useTaskStore()

const taskName = ref('')
const dialog = ref()
const taskNameInput = ref()

onMounted(() => {
  dialog.value.showModal()
  // dialog.value.style.maxHeight = "100dvh";
  // dialog.value.style.minHeight = "40dvh";
  dialog.value.classList.add('open')

  taskNameInput.value.focus()

  // dialog.value.addEventListener("close", () => {
  //   // to do: add some closing animation here
  //   router.push({ path: "/tasks" });
  // });
})

const shouldButtonBeDisabled = computed(() => taskName.value.trim().length < 1)

const createTask = async (submitEvent) => {
  const form = submitEvent.target

  const formData = new FormData(form)

  const { areAllValid, validationResults } = validateForm(formData)

  if (!areAllValid) {
    const firstError = validationResults.find((result) => !result.meets)
    errorUi(firstError, toasterStore)
    return
  }

  const response = await taskStore.createTask({ title: taskName.value })
  if (response.error) {
    console.error('Error creating task:', response.error)
    toasterStore.error({
      title: 'Task could not be created',
      text: response.error
    })
    return
  }

  taskName.value = ''

  toasterStore.success({
    title: 'Task created',
    text: 'You can now see it in your tasks list.',
    timeout: 4000
  })

  await taskStore.fetchTasks()
  router.push({ path: '/tasks' })
  // to do: tell Tasks view that there's a new task
}

const closeDialog = () => {
  dialog.value.close()
  router.push({ path: '/tasks' })
}
</script>
<template>
  <dialog ref="dialog" class="dialog">
    <header>
      <!--
      <RouterLink class="back-button" to="/tasks">
        <IconArrowLeft />
      </RouterLink>
      -->
      <button class="icon-button button-tertiary" @click="closeDialog">
        <IconArrowLeft />
      </button>
      <h2>Create task</h2>
    </header>
    <FormComponent @submitForm="createTask">
      <fieldset>
        <label>
          <span>Task name</span>
          <input
            type="text"
            name="task-name"
            placeholder="Do the laundry"
            v-model="taskName"
            ref="taskNameInput"
          />
        </label>
      </fieldset>
      <button type="submit" class="button-primary" :class="{ disabled: shouldButtonBeDisabled }">
        Create it!
      </button>
    </FormComponent>
    <div style="position: relative">
      <ToastComponent />
    </div>
  </dialog>
</template>

<style>
.dialog {
  top: auto;
  right: auto;
  bottom: -20rem;
  left: 50%;
  transform: translateX(-50%);

  border: none;

  position: fixed;
  box-shadow: var(--box-shadow-small);
  border-radius: var(--border-radius-big);
  padding: 2rem;
  min-width: 20rem;
  transition: bottom var(--transition-slow);
}

.dialog.open {
  bottom: 1rem;
}

.dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
