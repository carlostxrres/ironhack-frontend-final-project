<script setup>
import SimpleLayout from '@/components/SimpleLayout.vue'
import HorizontalRule from '@/components/HorizontalRule.vue'
</script>
<template>
  <SimpleLayout>
    <template v-slot:header>
      <h1>About</h1>
    </template>
    <template v-slot:content>
      <p>This is a simple task manager app with the following features:</p>

      <ul class="bullet-points">
        <li>View, add, edit, and delete tasks.</li>
        <li>Mark tasks as completed or pending.</li>
        <li>Filter tasks by title.</li>
        <li>Set a timer to perform a task.</li>
        <li>Display the tasks in a calendar, and navigate through them.</li>
        <li>Mobile-first and responsive design.</li>
      </ul>

      <HorizontalRule />

      <h3>Background</h3>
      <p>
        This application was developed by me,
        <a href="https://github.com/carlostxrres" target="_blank">Carlos Torres</a>, as a final
        project for
        <a href="https://www.ironhack.com/es-en/barcelona" target="_blank">Ironhack</a>'s Front-End
        Bootcamp on June 2024. It serves as a demonstration of core competencies in Vue.js and
        associated technologies.
      </p>

      <p>Thank you for checking out my project! ❤️</p>

      <HorizontalRule />

      <h3>Technologies used</h3>
      <ul class="bullet-points">
        <li>Vue 3: the progressive JavaScript framework.</li>
        <li>Vue Router: routing for single-page applications.</li>
        <li>Pinia: state management.</li>
        <li>Supabase: backend services (user authentication and a database for the tasks).</li>
      </ul>

      <HorizontalRule />

      <h3>Source code</h3>
      <p>
        The complete source code is available on
        <a href="https://github.com/carlostxrres/ironhack-frontend-final-project" target="_blank"
          >GitHub</a
        >. Feel free to explore, contribute, or provide feedback.
      </p>
    </template>
  </SimpleLayout>
</template>

<style></style>
