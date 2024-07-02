<script setup>
import FormComponent from '@/components/FormComponent.vue'
import { useTaskStore } from '@/stores/task.js'
import useToasterStore from '@/stores/toaster.js'
import { validateForm, errorUi } from '@/services/validateForm.js'
import { ref, computed } from 'vue'
import router from '@/router/index.js'
import DialogComponent from '@/components/DialogComponent.vue'

const toasterStore = useToasterStore()
const taskStore = useTaskStore()
const taskName = ref('')
const taskNameInput = ref(null)

const focusOnInput = () => {
  taskNameInput.value.focus()
}

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
}
</script>
<template>
  <DialogComponent title="Create task" :onOpen="focusOnInput">
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
  </DialogComponent>
</template>
