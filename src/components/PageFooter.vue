<script setup>
import { getUser, removeUser, isLoggedIn } from '@/services/session.js'
import router from '@/router/index.js'
const logOut = () => {
  removeUser()
  router.push('/sign-in')
}

const getDayPeriod = () => {
  const periods = [
    {
      name: 'night',
      endHour: 6
    },
    {
      name: 'morning',
      endHour: 12
    },
    {
      name: 'afternoon',
      endHour: 19
    },
    {
      name: 'evening',
      endHour: 22
    },
    {
      name: 'night',
      endHour: 24
    }
  ]

  const hour = new Date().getHours()
  const period = periods.find((period) => period.endHour >= hour)
  return period.name || 'day'
}

const getGreeting = () => {
  const dayPeriod = getDayPeriod()
  const user = getUser()
  const email = user ? user.user.email : null
  const appellative = user ? `, ${email}` : ''
  return `Good ${dayPeriod}${appellative}!`
}

const greeting = getGreeting()
</script>

<template>
  <footer class="page-footer">
    <div class="footer-text">
      <p>{{ greeting }}</p>
      <ul class="footer-links">
        <li>
          <RouterLink to="/about" class="discreet-anchor semi-discreet-anchor">About</RouterLink>
        </li>
        <li>
          <a
            href="https://github.com/carlostxrres/ironhack-frontend-final-project"
            target="_blank"
            class="discreet-anchor semi-discreet-anchor"
          >
            GitHub</a
          >
        </li>
        <li>
          <a
            href="https://github.com/carlostxrres"
            target="_blank"
            class="discreet-anchor semi-discreet-anchor"
            >Author</a
          >
        </li>
      </ul>
    </div>
    <button @click="logOut" class="button-tertiary" v-if="isLoggedIn()">Log out</button>
  </footer>
</template>

<style>
.footer-text {
  color: var(--color-text-4);
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  font-size: 0.8rem;
}
.footer-links > li:not(:last-child)::after {
  content: '·';
  margin-inline: 0.5rem;
  color: var(--color-text-4);
}
</style>
