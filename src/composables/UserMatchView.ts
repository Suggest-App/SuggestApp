import router from "@/router";
import { useRoute } from "vue-router";
import { useMatchesStore } from "@/stores/MatchesStore";
import type { Match } from "@/models/Match"
export function useUserMatchView() {

    // Initialize the stores and route location
    const store = useMatchesStore()
    const route = useRoute()

    // The uid from the url and bool that indicates if the user id is required
    const userId = route.params.id as string
    const requiresUid = route.meta.requiresUid as boolean

    // Return a user match, if it's located in the matches map and redirects otherwise
    function getMatchByRouteParam(): Match | void {

        // Redirect if the view requires a user object but the url doesn't contain an uid
        if (requiresUid && !userId) {
            router.push({ name: 'matches' })
        }

        // Check if the matches map has a key that matches the uid and if the value of this key is indeed an object from type match
        if (store.matchesMap.has(userId) && isInstanceOfMatch(store.matchesMap.get(userId))) {
            return store.matchesMap.get(userId)
        }

        // In all other cases return to the matches view
        router.push({ name: 'matches' })
    }

    // Check if passed object is from type match
    function isInstanceOfMatch(object: any): object is Match {
        return 'rank' && 'username' in object;
    }

    return { getMatchByRouteParam }
}
