<script setup>
import { useUserStore } from '../stores/user'
import useToasterStore from '@/stores/toaster.js'
// import { useTaskStore } from '../stores/task'
import { ref, onMounted } from 'vue'
import router from '@/router/index.js'

import SimpleLayout from '@/components/SimpleLayout.vue'
import ToastComponent from '@/components/ToastComponent.vue'
import FormComponent from '@/components/FormComponent.vue'

import { validateForm, errorUi } from '@/services/validateForm.js'

import { ERROR_EXPLANATIONS } from '@/CONSTANTS.js'
import { isLoggedIn } from '@/services/session.js'

const userStore = useUserStore()
// const taskStore = useTaskStore()
const toasterStore = useToasterStore()

const email = ref('')
const password = ref('')
const acceptsTerms = ref('')
const passwordConfirm = ref('')

onMounted(() => {
  if (isLoggedIn()) {
    router.push('/tasks')
  }
})

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
    router.push('/tasks')
    console.log(userStore.user)
    // To do: navigate somewhere else
  }
}

//
</script>

<template>
  <SimpleLayout class="sign-up-section">
    <template v-slot:header>
      <div class="asdasd">
        <h1>Sign up</h1>
        <small>Already a member? <router-link to="/sign-in">Sign in</router-link></small>
      </div>
    </template>
    <template v-slot:content>
      <FormComponent @submitForm="onSubmit">
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
        <button type="submit" class="button-primary">Create new User</button>
      </FormComponent>
    </template>
  </SimpleLayout>
</template>

<style></style>
