<script lang="ts" setup>
import { getCookie, getUsersAccounts, getUserToken, setCookie } from "@/services/TokenService";
import type { Ref } from "vue";
import {onMounted, ref} from "vue";
import type { DevUser } from "@/models/DevUser";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";
import EyeSlashIcon from "@/components/icons/EyeSlashIcon.vue";
import router from "@/router";

// Try to get the admin password from cookie
const cookie: string | undefined = getCookie('adminPw')
// Token from input
const password: Ref<string> = ref((cookie !== undefined) ? cookie : '')
const searchbar: Ref<string> = ref('')

const showPassword: Ref<boolean> = ref(false)

// Users array that is getting rendered
const users: Ref<DevUser[]> = ref({} as DevUser[])
const filteredUserArray: Ref<DevUser[]> = ref({} as DevUser[])

// Fetch all user accounts on mount, if admin pw cookie isset
onMounted(async () => {
  document.body.classList.remove('no-scroll')
  if (cookie !== undefined) {
    users.value = await getUsersAccounts(password.value)
    filteredUserArray.value = users.value
    console.log(filteredUserArray)
  }
})

// Set the user input as cookie
async function getUsers() {
    users.value = await getUsersAccounts(password.value)
    filteredUserArray.value = users.value

    if (users.value) {
      setCookie('adminPw', password.value, 7)
    }
}

// Set get the jwt from a user account passed on its uid and the admin password
async function setUserToken(uid: string) {
  const jwt = await getUserToken(uid, password.value)
  if (jwt && jwt !== '') {
    setCookie('jwt', jwt, 7)
    await router.push({ name: 'profile' })
  }
}

function searchUser(): void {
  if (searchbar.value === '') {
    filteredUserArray.value = users.value
  } else {
    filteredUserArray.value = users.value.filter(function (el: DevUser) {
      return el.name.toLowerCase().includes(searchbar.value.toLowerCase())
    });
  }
}
</script>

<template>
  <div class="base-wrapper dev-auth">
    <label for="admin-password">
      <span>Admin password:</span>
      <input @input="getUsers" v-model="password" id="admin-password" :type="(showPassword) ? 'text' : 'password'" />
      <EyeIcon v-show="!showPassword" @click="showPassword = true" />
      <EyeSlashIcon v-show="showPassword" @click="showPassword = false"/>
    </label>

    <label v-if="users.length !== 0" for="searchbar">
      <span>Search user by name:</span>
      <input @input="searchUser" v-model="searchbar" id="searchbar" type="text" placeholder="username ..." />
      <SearchIcon />
    </label>

    <div
        class="user"
        v-for="user in filteredUserArray"
        :key="user.userId"
    >
      <span class="name">{{ (user.name) ? user.name : 'unknown username' }}</span>
      <button @click.prevent="setUserToken(user.userId)">Get Token</button>
    </div>
  </div>
</template>

<style lang="scss">
.base-wrapper.dev-auth {
  max-width: 600px;
  padding-top: 45px;
  margin: 0 auto;

  label {
    position: relative;
    width: 100%;
    height: auto;
    display: block;

    span {
      color: $primary-text-color;
      font-weight: 500;
      letter-spacing: 0.1px;
      margin-bottom: 5px;
      font-size: 18px;
    }

    svg {
      position: absolute;
      bottom: 38px;
      right: 15px;
      width: 16px;
      height: 16px;
    }
  }

  [for="admin-password"] svg {
    cursor: pointer;
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