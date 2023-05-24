import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { getCookie } from "@/services/TokenService";
import AuthView from '@/views/AuthView.vue'
import DevAuthView from '@/views/DevAuthView.vue'
import ProfileView from "@/views/ProfileView.vue";
import DiscoverMediaView from "@/views/DiscoverMediaView.vue";
import MatchesView from "@/views/MatchesView.vue";
import MatchingProfileView from "@/views/MatchingProfileView.vue";
import SettingsView from "@/views/SettingsView.vue";
import ArchiveView from "@/views/ArchiveView.vue";
import ConnectedAppsView from "@/views/ConnectedAppsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import {useMainStore} from "@/stores/MainStore";
import AllMediaView from "@/views/AllMediaView.vue";
import {useProfileStore} from "@/stores/ProfileStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: (import.meta.env.VITE_STAGE === 'dev') ? DevAuthView : AuthView,
      meta: {
        showNavbar: false,
        requiresUid: false
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        showNavbar: true,
        requiresUid: false
      }
    },
    {
      path: '/matches',
      name: 'matches',
      component: MatchesView,
      meta: {
        showNavbar: true,
        requiresUid: false
      }
    },
    {
      path: '/discover',
      name: 'discover',
      component: DiscoverMediaView,
      meta: {
        showNavbar: true,
        requiresUid: false
      }
    },
    {
      path: '/matching-profile/:id',
      name: 'matching-profile',
      component: MatchingProfileView,
      meta: {
        showNavbar: true,
        requiresUid: true
      }
    },
    {
      path: '/all-media/:endpoint/:id',
      name: 'all-media',
      component: AllMediaView,
      meta: {
        showNavbar: true,
        requiresUid: true
      }
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchiveView,
      meta: {
        showNavbar: true,
        requiresUid: false
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: {
        showNavbar: true,
        requiresUid: false
      }
    },
    {
      path: '/connected-apps',
      name: 'connected-apps',
      component: ConnectedAppsView,
      meta: {
        showNavbar: true,
        requiresUid: false
      }
    },
    {
      path: "/:catchAll(.*)",
      name: 'NotFound',
      component: NotFoundView,
      meta: {
        showNavbar: false,
        requiresUid: false
      }
    },
  ]
})

/**
 * Check before each router view change, if the user has a valid token
 * If not redirect him to auth view
 *
 * @param toRoute RouteLocationNormalized
 *
 * @return Promise<string | void>
 */
router.beforeEach(async (toRoute: RouteLocationNormalized): Promise<string | void> => {

  // Always set the loading flag to true if route changes
  const mainStore = useMainStore()
  mainStore.isLoading = true

  // Reset ui flags
  resetFlags()

  // all pages that doesn't require authorization
  const publicPages = ['/']

  // Bool that indicates if target route requires a token
  const tokenRequired = !publicPages.includes(toRoute.path)

  // Redirect if route require token, but there is no token in local storage
  if (tokenRequired && !getCookie('jwt')) {
    return '/'
  }

  // Auto redirect to profile, if user is already authenticated and try to visit a public page
  if (publicPages.includes(toRoute.path) && getCookie('jwt')) {
    return '/profile'
  }
})

// Reset all frontend flags that interact with the ui
function resetFlags() {
  const profileStore = useProfileStore()
  profileStore.selectMediaFlag = false
}

export default router
