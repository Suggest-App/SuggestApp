import { useMatchesStore } from "@/stores/MatchesStore";
import type { Match } from "@/models/Match";
import MatchesService from "@/services/MatchesService";

/**
 * Fetch all users that matches the own media summary
 * The array is already ordered desc
 *
 * @return Promis<void>
 */
export async function fetchUserMatches(): Promise<void> {
    // Initialize the matches store
    const matchesStore = useMatchesStore()

    // Fetch the ordered user matches
    const allMatches: Match[] = await MatchesService.fetchMatches()

    // Set them into the store
    matchesStore.matches = allMatches

    // Generate the matches map
    allMatches.forEach((match: Match): void => {
        matchesStore.matchesMap.set(match.userId, match)
    })
}
