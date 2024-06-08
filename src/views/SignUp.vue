<script setup>
import { useUserStore } from '../stores/user'
import useToasterStore from '@/stores/toaster.js'
// import { useTaskStore } from '../stores/task'
import { ref } from 'vue'
import router from '@/router/index.js'

import SplitLayout from '@/components/SplitLayout.vue'
import ToastComponent from '@/components/ToastComponent.vue'
import FormComponent from '@/components/FormComponent.vue'
import PageHeader from '@/components/PageHeader.vue'

import { validateForm, errorUi } from '@/services/validateForm.js'

import { ERROR_EXPLANATIONS } from '@/CONSTANTS.js'

const userStore = useUserStore()
// const taskStore = useTaskStore()
const toasterStore = useToasterStore()

const email = ref('')
const password = ref('')
const acceptsTerms = ref('')
const passwordConfirm = ref('')

const onSubmit = async (submitEvent) => {
  const form = submitEvent.target

  const formData = new FormData(form)
  formData.append('accepts-terms', acceptsTerms.value)
  formData.append('time-spent', submitEvent.timeStamp) // Are we using this?
  const { areAllValid, validationResults } = validateForm(formData)

  if (!areAllValid) {
    const firstError = validationResults.find((result) => !result.meets)
    errorUi(firstError, toasterStore)
    return
  }

  // Send
  const response = await userStore.createNewUser(email.value, password.value)
  if (response.error) {
    errorUi(
      {
        conditionName: ERROR_EXPLANATIONS({ email: email.value })[response.error] || '',
        invalidMessage: response.error
      },
      toasterStore
    )
  } else {
    toasterStore.success({
      title: 'User created',
      text: 'You can now sign in with your new account.',
      timeout: 4000
    })
    router.push('dashboard')
    console.log(userStore.user)
    // To do: navigate somewhere else
  }
}

//
</script>

<template>
  <PageHeader />
  <SplitLayout class="sign-up-section">
    <p class="corner">Already a member? <router-link to="/sign-in">Sign in</router-link></p>

    <FormComponent @submitForm="onSubmit">
      <h1>Sign up</h1>
      <fieldset>
        <label>
          <span>Email</span>
          <input type="email" name="email" placeholder="user@email.com" v-model="email" />
        </label>
      </fieldset>
      <fieldset>
        <label>
          <span>Password</span>
          <input type="password" placeholder="******" name="password" v-model="password" />
        </label>
        <label>
          <span>Confirm your password</span>
          <input
            type="password"
            placeholder="******"
            name="password-confirm"
            v-model="passwordConfirm"
          />
        </label>
      </fieldset>
      <fieldset>
        <label class="horizontal-label terms">
          <span>
            <input type="checkbox" name="accepts-terms" v-model="acceptsTerms" />
          </span>

          <span>
            Creating an account means you're okay with our
            <RouterLink to="/docs/terms-of-service">Terms of Service</RouterLink>,
            <RouterLink to="/docs/privacy-policy">Privacy Policy</RouterLink>, and our default
            <RouterLink to="/settings/notifications">Notification Settings</RouterLink>.
          </span>
        </label>
      </fieldset>
      <button type="submit">Create new User</button>
    </FormComponent>
    <br /><br />

    <!--
      <button @click="taskStore.fetchTasks()">fetch tasks</button>
      <ul>
        <li v-for="task in taskStore.tasks" :key="task.id">
          {{ task.title }}
        </li>
      </ul>
    -->
  </SplitLayout>

  <ToastComponent />
</template>

<style>
.corner {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
