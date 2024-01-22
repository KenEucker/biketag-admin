import { BikeTagClient } from 'biketag'
import { defineStore } from 'pinia'
import { BikeTagDefaults, BikeTagPlayersStoreState, Player } from '../common'

export const useBikeTagPlayersStore = defineStore(`${BikeTagDefaults.store}::players`, {
  state: (): BikeTagPlayersStoreState => ({
    players: [] as Player[],
    allPlayers: [] as Player[],
  }),

  actions: {
    fetchPlayers(biketagClient: BikeTagClient, cached = true) {
      return biketagClient
        .getPlayers(undefined, {
          source: BikeTagDefaults.gameSource,
          cached,
        })
        .then((d) => {
          if (d.success) {
            this.players = d.data as unknown as Player[]
          }
          return this.players
        })
    },
    fetchAllPlayers(biketagClient: BikeTagClient, cached = true) {
      return biketagClient
        .getPlayers(
          { game: '' },
          {
            source: BikeTagDefaults.tagSource,
            cached,
          },
        )
        .then((d) => {
          if (d.success) {
            this.allPlayers = d.data as unknown as Player[]
          }
          return this.allPlayers
        })
    },
  },

  getters: {
    playersGames: (state) => (player: string) => {
      let playersGames = state.players.find((p) => p.name === player)?.games
      if (!playersGames?.length) {
        playersGames = state.allPlayers.find((p) => p.name === player)?.games
      }
      return playersGames ?? []
    },
    gamesPlayers: (state) => (game: string) => {
      let gamesPlayers = state.players.filter((p) => p.games.indexOf(game) !== -1)
      if (!gamesPlayers?.length) {
        gamesPlayers = state.allPlayers.filter((p) => p.games.indexOf(game) !== -1)
      }
      return gamesPlayers ?? []
    },
    getPlayer: (state) => (player: string) => {
      return (
        state.players.find((p) => p.name === player) ??
        state.allPlayers.find((p) => p.name === player)
      )
    },
    getPlayers: (state) => {
      return state.players
    },
    getAllPlayers: (state) => {
      return state.allPlayers
    },
  },
})
