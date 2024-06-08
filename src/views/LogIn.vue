<script setup>
import { ref } from 'vue'

import SplitLayout from '@/components/SplitLayout.vue'
import FormComponent from '@/components/FormComponent.vue'
import ToastComponent from '@/components/ToastComponent.vue'
import PageHeader from '@/components/PageHeader.vue'

import router from '@/router/index.js'

import { validateForm, errorUi } from '@/services/validateForm.js'

import { useUserStore } from '@/stores/user'
import useToasterStore from '@/stores/toaster.js'

import { ERROR_EXPLANATIONS } from '@/CONSTANTS.js'

const userStore = useUserStore()
const toasterStore = useToasterStore()

const email = ref('')
const password = ref('')

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
    router.push('dashboard')
    console.log(userStore.user)
  }
}
</script>

<template>
  <PageHeader />
  <SplitLayout>
    <FormComponent @submitForm="onSubmit">
      <h1>Sign in</h1>
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
      <button type="submit">Let's go!</button>
    </FormComponent>
  </SplitLayout>
  <ToastComponent />
</template>

<style></style>
