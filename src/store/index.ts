import BikeTagClient from 'biketag'
import { Achievement, Game, Player, Tag } from 'biketag/lib/common/schema'
import { defineStore } from 'pinia'
import {
  BikeTagAdminStoreState,
  BikeTagDefaults,
  debug,
  getApiUrl,
  getBikeTagAdminOpts,
  getBikeTagHash,
  getDomainInfo,
  getProfileFromCookie,
} from '../common'

import { useBikeTagAmbassadorsStore } from './ambassadors'
import { useBikeTagGamesStore } from './games'

let client: BikeTagClient
let gameName: string
let biketagClientOpts: any
let bikeTagInitialized = false

export const initBikeTagAdminStore = () => {
  if (!bikeTagInitialized) {
    bikeTagInitialized = true

    const domain = getDomainInfo(window)
    gameName = domain.subdomain ?? process.env.GAME_NAME ?? BikeTagDefaults.gameName
    biketagClientOpts = {
      // biketag: {
      cached: true,
      host: process.env.CONTEXT === 'dev' ? getApiUrl() : `https://${gameName}.biketag.org/api`,
      clientKey: getBikeTagHash(window?.location?.hostname),
      ...getBikeTagAdminOpts(window as any, true),
    }
    client = new BikeTagClient(biketagClientOpts)

    debug(`init::${BikeTagDefaults.store}`, {
      subdomain: domain.subdomain,
      domain,
      gameName,
    })
  }
}

export const useBikeTagAdminStore = defineStore(BikeTagDefaults.store, {
  state: (): BikeTagAdminStoreState => ({
    dataLoaded: false,
    achievements: [] as Achievement[],
    tags: [] as Tag[],
    players: [] as Player[],
    profile: getProfileFromCookie(),
  }),

  actions: {
    fetchGames() {
      const gamesStore = useBikeTagGamesStore()
      return gamesStore.fetchGames(client)
    },
    fetchAmbassadors() {
      const ambassadorsStore = useBikeTagAmbassadorsStore()
      return ambassadorsStore.fetchAmbassadors(client)
    },
    setGameContext(game: string) {
      const gamesStore = useBikeTagGamesStore()
      return gamesStore.setGameContext(game)
    },
  },

  getters: {
    getThisGame: (state) => () => {
      const gamesStore = useBikeTagGamesStore()
      return gamesStore.getThisGame
    },
    getGame: (state) => (gameName?: string) => {
      const gamesStore = useBikeTagGamesStore()
      return gamesStore.getGame(gameName)
    },
    getGames: (state) => {
      const gamesStore = useBikeTagGamesStore()
      return gamesStore.getGames
    },
    getAmbassador: (state) => (ambassadorNameOrEmail: string) => {
      const ambassadorsStore = useBikeTagAmbassadorsStore()
      return ambassadorsStore.getAmbassador(ambassadorNameOrEmail)
    },
    getAmbassadors: (state) => {
      const ambassadorsStore = useBikeTagAmbassadorsStore()
      return ambassadorsStore.getAmbassadors
    },
    gamesAmbassadors: (state) => (gameName: string) => {
      const ambassadorsStore = useBikeTagAmbassadorsStore()
      return ambassadorsStore.gamesAmbassadors(gameName)
    },
    ambassadorsGames: (state) => (ambassadorName: string) => {
      const ambassadorsStore = useBikeTagAmbassadorsStore()
      return ambassadorsStore.ambassadorsGames(ambassadorName)
    },
  },
})

/// TODO: check to see if we can automatically call initBikeTagStore
export interface BikeTagAdminStore extends ReturnType<typeof useBikeTagAdminStore> {}
