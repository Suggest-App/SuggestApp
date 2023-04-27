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

    // Fetch matches, if the map is empty or if only one user is in it.
    // After reloading in a match related view, matches map will initially be empty. But there will always be an empty user object returned.
    // Because this empty object is getting populated and set in the map, the map will have size 1 after returning to the matches view
    if (matchesMap.size <= 1) {

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

    // Fetch and set the UserMatch information from the /profile-information endpoint, if not already set
    if (tempMatch.getTotalListenedTime() === '') {
      console.log('fetch match info')
      const matchInformation = await MatchesService.fetchMatchInformation(userId);
      tempMatch.setTotalListenedTime(matchInformation.totalListenedSeconds)
      tempMatch.setTrackingSince(matchInformation.trackingSince)
      tempMatch.setLastFetched(matchInformation.latestFetch)
      tempMatch.setUsername(matchInformation.username)
      tempMatch.setProfileImgSrc(matchInformation.profileImage)
    }

    // Fetch the together consumed media, if the matches property is empty
    if (tempMatch.getTogetherConsumedMedia().length === 0) {
      console.log('fetch together media')
      const togetherConsumedMedia = await MatchesService.fetchTogetherConsumedMedia(userId, 18);
      tempMatch.setTogetherConsumedMedia(togetherConsumedMedia)
    }

    // Fetch the recommended media, if the matches property is empty
    if (tempMatch.getRecommendedMedia().length === 0) {
      console.log('fetch recommended media')
      const recommendedMedia = await MatchesService.fetchRecommendedMedia(userId, 18);
      tempMatch.setRecommendedMedia(recommendedMedia)
    }

    // Fetch the media summary, if the matches property is empty
    if (tempMatch.getMediaSummary().length === 0) {
      console.log('fetch media summary')
      const mediaSummary = await MatchesService.fetchMatchSummary(userId, 100);
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
