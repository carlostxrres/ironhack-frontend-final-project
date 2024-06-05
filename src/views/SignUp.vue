<script setup>
import { useUserStore } from '../stores/user'
// import { useTaskStore } from '../stores/task'
import { ref } from 'vue'
import router from '@/router/index.js'
import SidePresentation from '@/components/SidePresentation.vue'
// import IconError from '@/components/icons/IconError.vue'
// import BannerComponent from '@/components/BannerComponent.vue'

import ToastComponent from '@/components/ToastComponent.vue'
import useToasterStore from '@/stores/toaster.js'
import { validateForm } from '@/services/validateForm.js'

const userStore = useUserStore()
// const taskStore = useTaskStore()

const toasterStore = useToasterStore()

const email = ref('')
const password = ref('')
const acceptsTerms = ref('')
const passwordConfirm = ref('')

const errorExplanations = {
  'User already registered': `The email address ${email.value} is already registered. Please log in with it or use a different email to create a new account.`
}

const errorUi = ({ invalidMessage, conditionName, fieldName }) => {
  // Toast
  const toast = toasterStore.error({
    title: invalidMessage,
    text: conditionName
  })

  // Get input
  const input = document.querySelector(`.sign-up-section form [name="${fieldName}"]`)
  if (input instanceof Element === false) {
    return
  }

  // Highlight & focus
  input.classList.add('error')
  input.focus()

  // Cuando se haga focus en el input, quitar el feedback de error
  const removeUiFeedback = () => {
    toasterStore.removeToast(toast.id)
    input.classList.remove('error')
  }
  input.addEventListener('focus', removeUiFeedback, { once: true })
  input.addEventListener('blur', removeUiFeedback, { once: true })
}

const onSubmit = async (submitEvent) => {
  const form = submitEvent.target

  const formData = new FormData(form)
  formData.append('accepts-terms', acceptsTerms.value)
  formData.append('time-spent', submitEvent.timeStamp) // Are we using this?
  const { areAllValid, validationResults } = validateForm(formData)

  if (!areAllValid) {
    const firstError = validationResults.find((result) => !result.meets)
    errorUi(firstError)
    return
  }

  // Send
  const response = await userStore.createNewUser(email.value, password.value)
  if (response.error) {
    // toasterStore.error({
    //   title: response.error,
    //   text: errorExplanations[response.error] || ''
    // })

    errorUi({
      conditionName: errorExplanations[response.error] || '',
      invalidMessage: response.error
      // fieldName: 'password'
    })
  } else {
    toasterStore.success({
      title: 'User created',
      text: 'You can now log in with your new account.',
      timeout: 4000
    })
    router.push('log-in')
    // To do: navigate somewhere else
  }
}

//
</script>

<template>
  <div class="sign-up-section">
    <SidePresentation />
    <main>
      <h1>Sign up</h1>

      <p class="corner">Already a member? <router-link to="/login">Log in</router-link></p>

      <form @submit.prevent="onSubmit">
        <fieldset>
          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="user@email.com" v-model="email" />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <span>Password</span>
            <input type="password" name="password" v-model="password" />
          </label>
          <label>
            <span>Confirm your password</span>
            <input type="password" name="password-confirm" v-model="passwordConfirm" />
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
      </form>
      <br /><br />

      <!--
      <button @click="taskStore.fetchTasks()">fetch tasks</button>
      <ul>
        <li v-for="task in taskStore.tasks" :key="task.id">
          {{ task.title }}
        </li>
      </ul>
    --></main>
  </div>

  <ToastComponent />
</template>

<style>
.sign-up-section {
  display: flex;
  /* grid-template-columns: 1fr 2fr; */
  /* align-items: stretch; */

  min-height: 100vh;
}

.sign-up-section main {
  flex: 2;
  position: relative;
  background-color: var(--color-background);

  .corner {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  h1 {
    font-weight: bold;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    fieldset {
      border: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media (min-width: 640px) {
        flex-direction: row;
      }
    }

    label {
      display: grid;
      gap: 0.2rem;
      flex-grow: 1;
    }
    label.horizontal-label {
      grid-template-columns: auto 1fr;
      align-items: start;
      gap: 0.5rem;
    }

    .terms {
      font-size: 0.8rem;
      color: var(--color-text-3);
      input {
        width: 0.7rem;
        height: 0.7rem;
      }
    }
  }
}
</style>
