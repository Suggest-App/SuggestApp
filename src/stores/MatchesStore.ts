import {reactive, ref} from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { UserMatch } from "@/classes/UserMatch";
import {useRoute} from "vue-router";
import MatchesService from "@/services/MatchesService";

export const useMatchesStore = defineStore('matchesStore', () => {

  // Map that contains all user match objects, needed to directly call by user uid
  const matchesMap: Map<string, UserMatch> = reactive(
      new Map<string, UserMatch>()
  )

  /**
   * Fetch the map with values from the 'user/matches' endpoint and set the map entries
   *
   * @return Promise<void>
   */
  async function generateMatchesMap(): Promise<void> {

    // Fetch the ordered user matches
    const allMatches = await MatchesService.fetchMatches()

    for (const match of allMatches) {
      // Initialize new UserMatch object
      const userMatch = new UserMatch()

      // Set the UserMatch properties, from the matches endpoint
      userMatch.setUserId(match.userId)
      userMatch.setRank(match.rank)
      userMatch.setUsername(match.username)
      userMatch.setProfileImgSrc(match.profileImage)
      userMatch.setTogetherListenedTime(match.listenedTogetherSeconds)

      // Set the UserMatch object into the matchesMap
      matchesMap.set(match.userId, userMatch)
    }
  }

  /**
   * Get a single user match entry from the matches map by its uid
   *
   * @param uid string
   *
   * @return UserMatch
   */
  function getUserMatchByUid(uid: string): UserMatch {
    // Check if the uid matches a map key
    if (matchesMap.has(uid)) {

      // Get the UserMatch from the map object by its uid and ensure that it's not undefined
      const match = matchesMap.get(uid)
      return (match) ? match : new UserMatch()
    }

    // Return en empty user array by default in order to ensure the return type
    return new UserMatch()
  }

  /**
   * Fill the UserMatch object with the fetched data
   *
   * @param userId string
   *
   * @return Promise<void>
   */
  async function fetchUserMatchProperties(userId: string): Promise<void> {

    // Get the UserMatch object from the matchesMap
    const tempMatch = getUserMatchByUid(userId)

    // On page reload matches need to be fetched, if the user is in a matches related view
    if (tempMatch.getUserId() === '') {
      const allMatches = await MatchesService.fetchMatches();
      // Iterate all matches a find the user with the id from the current route
      for (const match of allMatches) {
        if (match.userId === userId) {
          // Set the missing properties
          tempMatch.setUserId(match.userId)
          tempMatch.setRank(match.rank)
          tempMatch.setTotalListenedTime(match.listenedTogetherSeconds)
        }
      }
    }

    // Fetch and set the UserMatch information from the /profile-information endpoint, if not already set
    if (
        tempMatch.getUsername() === '' ||
        tempMatch.getTotalListenedTime() === '' ||
        tempMatch.getTrackingSince() === ''
    ) {
      const matchInformation = await MatchesService.fetchMatchInformation(userId);

      tempMatch.setTotalListenedTime(matchInformation.totalListenedSeconds)
      tempMatch.setTrackingSince(matchInformation.trackingSince)
      tempMatch.setLastFetched(matchInformation.lastFetch)
      tempMatch.setUsername(matchInformation.username)
      tempMatch.setProfileImgSrc(matchInformation.profileImage)
    }

    // Fetch the together consumed media, if the matches property is empty
    if (tempMatch.getTogetherConsumedMedia().length === 0) {
      const togetherConsumedMedia = await MatchesService.fetchTogetherConsumedMedia(userId, 10);
      tempMatch.setTogetherConsumedMedia(togetherConsumedMedia)
    }

    // Fetch the recommended media, if the matches property is empty
    if (tempMatch.getRecommendedMedia().length === 0) {
      const recommendedMedia = await MatchesService.fetchRecommendedMedia(userId, 10);
      tempMatch.setRecommendedMedia(recommendedMedia)
    }

    // Fetch the media summary, if the matches property is empty
    if (tempMatch.getMediaSummary().length === 0) {
      const mediaSummary = await MatchesService.fetchMatchSummary(userId, 10);
      tempMatch.setMediaSummary(mediaSummary)
    }

    matchesMap.set(userId, tempMatch)
  }

  return {
    matchesMap,
    getUserMatchByUid,
    fetchUserMatchProperties,
    generateMatchesMap
  }
})
