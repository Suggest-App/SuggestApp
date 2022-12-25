import { createRouter, createWebHistory } from 'vue-router'
import AuthView from "@/views/AuthView.vue";
import HomeView from '../views/HomeView.vue'
import RankingView from "@/views/RankingView.vue";
import ProfileView from "@/views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AuthView',
      component: AuthView
    },
    {
      path: '/home',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/ranking',
      name: 'RankingView',
      component: RankingView
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: ProfileView
    }
  ]
})

export default router
