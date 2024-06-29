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
      name: "morning",
      start: 0,
    },
    {
      name: "afternoon",
      start: 12,
    },
    {
      name: "evening",
      start: 19,
    },
    {
      name: "night",
      start: 22,
    },
  ];

  const date = new Date();
  const hours = date.getHours();
  return periods.find((period) => hours >= period.start);
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
