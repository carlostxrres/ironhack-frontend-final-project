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
      endHour: 6,
    },
    {
      name: "morning",
      endHour: 12,
    },
    {
      name: "afternoon",
      endHour: 19,
    },
    {
      name: "evening",
      endHour: 22,
    },
    {
      name: "night",
      endHour: 24,
    },
  ];

  const hour = new Date().getHours();
  const period = periods.find((period) => period.endHour >= hour);
  return period.name || "day";
};

const getGreeting = () => {
  const dayPeriod = getDayPeriod();
  const user = getUser();
  const email = user ? user.user.email : null;
  const appellative = user ? `, ${email}` : "";
  return `Good ${dayPeriod}${appellative}!`;
};

const greeting = getGreeting();
</script>

<template>
  <footer class="page-footer">
    <p>{{ greeting }}</p>
    <button @click="logOut" class="button-tertiary" v-if="isLoggedIn()">Log out</button>
  </footer>
</template>

<style></style>
