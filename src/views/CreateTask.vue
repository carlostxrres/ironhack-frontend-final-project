<script setup>
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import FormComponent from '@/components/FormComponent.vue'
import { useTaskStore } from '@/stores/task.js'
import useToasterStore from '@/stores/toaster.js'
import { validateForm, errorUi } from '@/services/validateForm.js'
import { ref } from 'vue'
import router from '@/router/index.js'

const taskName = ref('')

const toasterStore = useToasterStore()
const taskStore = useTaskStore()

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

  router.push('tasks')
  // to do: tell Tasks view that there's a new task
}
</script>
<template>
  <div class="asd">
    <header>
      <RouterLink class="back-button" to="/tasks">
        <IconArrowLeft />
      </RouterLink>
      <h2>Create task</h2>
      <FormComponent @submitForm="createTask">
        <fieldset>
          <label>
            <span>Task name</span>
            <input type="text" name="task-name" placeholder="Do the laundry" v-model="taskName" />
          </label>
        </fieldset>
        <button type="submit">Let's go!</button>
      </FormComponent>
    </header>
  </div>

  <ToastComponent />
</template>

<style>
.asd {
  border-left: 1px solid var(--color-text-3);
  padding: 1rem 2rem;
}
</style>
