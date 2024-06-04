<script setup>
import { useUserStore } from '../stores/user'
// import { useTaskStore } from '../stores/task'
import { ref } from 'vue'
// import IconError from '@/components/icons/IconError.vue'
// import BannerComponent from '@/components/BannerComponent.vue'

import ToastComponent from '@/components/ToastComponent.vue'
import useToasterStore from '@/stores/toaster.js'

const userStore = useUserStore()
// const taskStore = useTaskStore()

const toasterStore = useToasterStore()

const email = ref('')
const password = ref('')

const errorExplanations = {
  'User already registered': `The email address ${email.value} is already registered. Please log in with it or use a different email to create a new account.`
}

const onSubmit = async () => {
  const response = await userStore.createNewUser(email.value, password.value)
  if (response.error) {
    toasterStore.error({
      title: response.error,
      text: errorExplanations[response.error] || ''
    })
    // To do: focus on the input with the error
  } else {
    toasterStore.success({
      title: 'User created',
      text: 'You can now log in with your new account.',
      timeout: 4000
    })
    // To do: navigate somewhere else
  }
}

//
</script>

<template>
  <div class="sign-up-section">
    <div class="highlighted-section">
      <h2>
        Welcome
        <br />
        <span class="discreet">t</span>o another
        <br />
        <span class="discreet">t</span>o To
        <br />
        <span class="discreet">t</span>o Do
        <br />
        <span class="discreet">t</span>o App
      </h2>
    </div>
    <main>
      <h1>Sign up</h1>

      <p class="corner">Already a member? <router-link to="/login">Log in</router-link></p>

      <!--
      <div class="banner-container">
        v-if="error" 
        <BannerComponent :error="error" :errorExplanation="errorExplanation">
          <template #icon>
            <IconError />
          </template>
        </BannerComponent>
      </div>
      -->

      <form @submit.prevent="onSubmit">
        <fieldset>
          <label>
            <span>Email</span>
            <input type="email" placeholder="user@email.com" v-model="email" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" v-model="password" />
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
  display: grid;
  grid-template-columns: 1fr 2fr;
  /* align-items: stretch; */

  min-height: 100vh;
}

.sign-up-section > * {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.highlighted-section {
  background-color: #f2cf84;
  color: #8a681e;
}
.highlighted-section h2 {
  font-weight: bold;
}
.discreet {
  font-weight: bold;
  opacity: 0.5;
}

.banner-container {
  position: absolute;
  bottom: 1rem;
}

.sign-up-section main {
  position: relative;

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
      gap: 1rem;
    }
    label {
      display: grid;
      gap: 0.2rem;
      flex-grow: 1;
    }
  }
}
</style>
