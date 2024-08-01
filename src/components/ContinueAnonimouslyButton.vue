<script setup>
import HorizontalRule from "@/components/HorizontalRule.vue"
import useToasterStore from "@/stores/toaster.js";
import { useUserStore } from '@/stores/user'
import router from "@/router/index.js";
import { ERROR_EXPLANATIONS } from '@/CONSTANTS.js'

const userStore = useUserStore()
const toasterStore = useToasterStore();

const continueAnonymously = async () => {
  const response = await userStore.signInAnonymously()
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
      title: 'You logged in anonymously',
      timeout: 3000
    })
    router.push('tasks')
  }
}
</script>

<template>
  <br>
  <HorizontalRule text="or..." style="margin-bottom: 0;" />
  <button class="button-tertiary" @click="continueAnonymously">
    Continue anonimously
  </button>
</template>
