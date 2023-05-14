<script lang="ts" setup>
import { getCookie, getUsersAccounts, getUserToken, setCookie } from "@/services/TokenService";
import type { Ref } from "vue";
import {onMounted, ref} from "vue";
import type { DevUser } from "@/models/DevUser";

// Try to get the admin password from cookie
const cookie: string | undefined = getCookie('adminPw')
// Token from input
const password: Ref<string> = ref((cookie !== undefined) ? cookie : '')
const searchbar: Ref<string> = ref('')

// Users array that is getting rendered
const users: Ref<DevUser[]> = ref([])

// Fetch all user accounts on mount, if admin pw cookie isset
onMounted(async () => {
  document.body.classList.remove('no-scroll')
  if (cookie !== undefined) {
    users.value = await getUsersAccounts(password.value)
  }
  console.log(users.value)
})

// Set the user input as cookie
async function getUsers() {
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

function searchUser(searchVal: string): void {

}
</script>

<template>
  <div class="base-wrapper dev-auth">
    <label for="admin-password">
      <span>Admin password:</span>
      <input @input="getUsers" v-model="password" id="admin-password" type="password">
    </label>

    <label v-if="users.length !== 0" for="searchbar">
      <span>Search user by name:</span>
      <input @input="searchUser" v-model="searchbar" id="searchbar" type="password">
    </label>

    <div
        class="user"
        v-for="[user, index] in users"
        :key="index"
    >
      <span class="name">Name{{ user.name }}</span>
      <button @click.prevent="setUserToken(user.uid)">Token ausstellen</button>
    </div>
  </div>
</template>

<style lang="scss">
.base-wrapper.dev-auth {
  padding-top: 45px;

  label span {
    color: $primary-text-color;
    font-weight: 500;
    letter-spacing: 0.1px;
    margin-bottom: 5px;
    font-size: 18px;
  }
  #admin-password,
  #searchbar {
    width: 100%;
    height: 45px;
    border-radius: 6px;
    border: none;
    background-color: $secondary-background-color;
    padding-left: 12px;
    margin-bottom: 25px;
    color: $primary-text-color
  }

  #admin-password:focus,
  #searchbar:focus,
  #admin-password:active,
  #searchbar:active {
    outline: none;
    border: none;
  }

  .user {
    @include flex-space-between;
    width: 100%;
    padding: 8px 0;

    .name {
      display: block;
      font-size: 18px;
      color: $primary-text-color;
    }

    button {
      border: 0;
      padding: 10px 8px;
      border-radius: 5px;
      background-color: #FA8231;
      font-weight: 600;
      cursor: pointer;
    }
  }
}
</style>