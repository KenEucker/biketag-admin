import { BikeTagClient } from 'biketag'
import { defineStore } from 'pinia'
import { Ambassador, BikeTagAmbassadorsStoreState, BikeTagDefaults } from '../common'
import { useBikeTagGamesStore } from './games'

export const useBikeTagAmbassadorsStore = defineStore(`${BikeTagDefaults.store}::ambassadors`, {
  state: (): BikeTagAmbassadorsStoreState => ({
    ambassadors: [] as Ambassador[],
  }),

  actions: {
    fetchAmbassadors(biketagClient: BikeTagClient, cached = true) {
      return biketagClient
        .getAmbassadors(undefined, {
          source: BikeTagDefaults.gameSource,
          cached,
        })
        .then((d) => {
          if (d.success) {
            this.ambassadors = d.data as unknown as Ambassador[]
          }
          return this.ambassadors
        })
    },
  },

  getters: {
    ambasadorsGames: (state) => (ambassador: string) => {
      const gamesStore = useBikeTagGamesStore()
      return gamesStore.getGames
        .filter((game: any) => game.ambassadors.includes(ambassador))
        .map((g) => g.name)
    },
    gamesAmbassadors: (state) => (gameName: string) => {
      const gamesStore = useBikeTagGamesStore()
      const game = gamesStore.getGame(gameName)
      return game?.ambassadors ?? []
    },
    getAmbassadors: (state) => {
      return state.ambassadors
    },
  },
})
