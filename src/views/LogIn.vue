<script setup>
import { ref, onMounted } from 'vue'

import SimpleLayout from '@/components/SimpleLayout.vue'
import FormComponent from '@/components/FormComponent.vue'

import router from '@/router/index.js'

import { validateForm, errorUi } from '@/services/validateForm.js'

import { useUserStore } from '@/stores/user'
import useToasterStore from '@/stores/toaster.js'

import { isLoggedIn } from '@/services/session.js'

import { ERROR_EXPLANATIONS } from '@/CONSTANTS.js'

const userStore = useUserStore()
const toasterStore = useToasterStore()

const email = ref('')
const password = ref('')

onMounted(() => {
  if (isLoggedIn()) {
    router.push('/tasks')
  }
})

const onSubmit = async (submitEvent) => {
  const form = submitEvent.target

  const formData = new FormData(form)
  const { areAllValid, validationResults } = validateForm(formData)

  if (!areAllValid) {
    const firstError = validationResults.find((result) => !result.meets)
    errorUi(firstError, toasterStore)
    return
  }

  // Send
  const response = await userStore.signIn(email.value, password.value)
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
      title: 'You are in!',
      timeout: 3000
    })
    router.push('tasks')
  }
}
</script>

<template>
  <SimpleLayout>
    <template v-slot:header>
      <div class="asdasd">
        <h1>Sign in</h1>
        <small>Not registered? <router-link to="/sign-up">Sign up</router-link></small>
      </div>
    </template>
    <template v-slot:content>
      <FormComponent @submitForm="onSubmit">
        <fieldset>
          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="user@email.com" v-model="email" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" placeholder="******" v-model="password" />
          </label>
        </fieldset>
        <button type="submit" class="button-primary">Let's go!</button>
      </FormComponent>
    </template>
  </SimpleLayout>
</template>

<style></style>
