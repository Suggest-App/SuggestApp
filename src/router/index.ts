import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import AuthView from "@/views/AuthView.vue";
import ShuffleView from '@/views/ShuffleView.vue'
import MatchesView from "@/views/MatchesView.vue";
import ProfileView from "@/views/ProfileView.vue";
import RecommendedMediaView from "@/views/RecommendedMediaView.vue";
import EmbeddedPlayerView from "@/views/EmbeddedPlayerView.vue";
import NotFound from "@/components/NotFound.vue";
import { getCookie } from "@/services/TokenService";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AuthView',
      component: AuthView,
      meta: { showNavbar: false }
    },
    {
      path: '/home',
      name: 'ShuffleView',
      component: ShuffleView,
      meta: { showNavbar: true }
    },
    {
      path: '/matches',
      name: 'MatchesView',
      component: MatchesView,
      meta: { showNavbar: true }
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: ProfileView,
      meta: { showNavbar: true }
    },
    {
      path: '/recommended-media/:id',
      name: 'RecommendedMediaView',
      component: RecommendedMediaView,
      meta: { showNavbar: true }
    },
    {
      path: '/player',
      name: 'EmbeddedPlayerView',
      component: EmbeddedPlayerView,
      meta: { showNavbar: true }
    },
    {
      path: "/:catchAll(.*)",
      name: 'NotFound',
      component: NotFound,
      meta: { showNavbar: false }
    },
  ]
})

/**
 * Check before each router view change, if the user has a valid token
 * If no redirect him to auth view
 *
 * @param toRoute RouteLocationNormalized
 *
 * @return Promise<string | void>
 */
router.beforeEach(async (toRoute: RouteLocationNormalized): Promise<string | void> => {

  // all pages that doesn't require authorization
  const publicPages = ['/']

  // Bool that indicates if target route requires a token
  const tokenRequired = !publicPages.includes(toRoute.path)

  // Redirect if route require token, but there is no token in local storage
  if (tokenRequired && !getCookie('jwt')) {
    return '/'
  }
})

export default router
