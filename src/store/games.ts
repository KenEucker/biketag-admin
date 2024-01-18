import { BikeTagGamesStoreState, BikeTagDefaults, Game } from '../common'
import { defineStore } from 'pinia'
import { BikeTagClient } from 'biketag'

export const useBikeTagGamesStore = defineStore(`${BikeTagDefaults.store}::games`, {
  state: (): BikeTagGamesStoreState => ({
    games: [] as Game[],
    /// TODO: move this section to the main admin-store?
    gameContext: null,
    gameContextName: null,
  }),

  actions: {
    fetchGames(biketagClient: BikeTagClient, cached = true) {
      return biketagClient
        .getGame(
          { game: '' },
          {
            source: BikeTagDefaults.gameSource,
          },
        )
        .then((d) => {
          if (d.success) {
            this.games = d.data as unknown as Game[]
          }
          return this.games
        })
    },
    /// TODO: move this method to the main admin-store?
    setGameContext(game: string) {
      const gameContext = this.games.find((g: any) => g.name === game)
      if (gameContext) {
        this.gameContext = gameContext
        this.gameContextName = gameContext.name
      }
    },
  },

  getters: {
    getGames: (state) => {
      return state.games
    },
    /// TODO: move these getters to the main admin-store?
    getThisGame: (state) => {
      return state.gameContext
    },
    getGame: (state) => (gameName?: string) => {
      return state.games.find((game) => game.name === gameName ?? state.gameContextName)
    },
  },
})
