<script lang="ts" setup>
import { getCookie, getUsersAccounts, getUserToken, setCookie } from "@/services/TokenService";
import type { Ref } from "vue";
import { ref } from "vue";
import type { DevUser } from "@/models/DevUser";

// Try to get the admin password from cookie
const cookie: string | undefined = getCookie('adminPw')
// Token from input
const password: Ref<string> = ref((cookie !== undefined) ? cookie : '')


// Users array that is getting rendered
const users: Ref<DevUser[]> = ref([])


// Set the user input as cookie
async function setAdminPassword() {
    users.value = await getUsersAccounts(password.value)
    if (users.value) {
      setCookie('adminPw', password.value, 7)
    }
}

// Set get the jwt from a user account passed on its uid and the admin password
async function setUserToken(uid: string) {
  const jwt = await getUserToken(uid, password.value)
  setCookie('jwt', jwt, 7)
}
</script>

<template>
  <label for="admin-password">
    <span>Password:</span>
    <input @input="setAdminPassword" v-model="password" id="admin-password" type="text">
  </label>

  <ul>
    <li
      v-for="[user, index] in users"
      :key="index"
    >
      {{ user.name }} <button @click.prevent="setUserToken(user.uid)">Token ausstellen</button>
    </li>
  </ul>
</template>

<style scoped>

</style>