<script setup>
import { getUser, removeUser, isLoggedIn } from "@/services/session.js";
import router from "@/router/index.js";
const logOut = () => {
  removeUser();
  router.push("/sign-in");
};

const getDayPeriod = () => {
  const periods = [
    {
      name: "night",
      end: 6,
    },
    {
      name: "morning",
      end: 12,
    },
    {
      name: "afternoon",
      end: 19,
    },
    {
      name: "evening",
      end: 22,
    },
    {
      name: "night",
      end: 24,
    },
  ];

  const date = new Date();
  const hour = date.getHours();
  return periods.find((period) => period.end >= hour);
};

const getGreeting = () => {
  const period = getDayPeriod();
  const user = getUser();
  const email = user ? user.user.email : null;
  return user ? `Good ${period.name}, ${email}!` : `Good ${period.name}!`;
};

const greeting = getGreeting();
</script>

<template>
  <footer class="page-footer">
    <p>{{ greeting }}</p>
    <button @click="logOut" class="button-tertiary" v-if="isLoggedIn()">Log out</button>
  </footer>
</template>

<style>
</style>
