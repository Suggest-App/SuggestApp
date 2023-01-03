import { createRouter, createWebHistory } from 'vue-router'
import AuthView from "@/views/AuthView.vue";
import ShuffleView from '@/views/ShuffleView.vue'
import MatchesView from "@/views/MatchesView.vue";
import ProfileView from "@/views/ProfileView.vue";
import RecommendedMediaView from "@/views/RecommendedMediaView.vue";

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
      name: 'ShuffleView',
      component: ShuffleView
    },
    {
      path: '/matches',
      name: 'MatchesView',
      component: MatchesView
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: ProfileView
    },
    {
      path: '/recommended-media',
      name: 'RecommendedMediaView',
      component: RecommendedMediaView
    }
  ]
})

export default router
