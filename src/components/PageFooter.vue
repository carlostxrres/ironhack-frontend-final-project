<script setup>
import { removeUser, isLoggedIn } from "@/services/session.js";
import router from "@/router/index.js";
const logOut = () => {
  removeUser();
  router.push("/sign-in");
};
</script>

<template>
  <footer class="page-footer">
    <p>This is the footer</p>
    <button @click="logOut" class="button-tertiary" v-if="isLoggedIn()">Log out</button>
  </footer>
</template>

<style>
.page-footer {
  align-self: normal;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
}
</style>
