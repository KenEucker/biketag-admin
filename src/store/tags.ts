import { BikeTagClient } from 'biketag'
import { defineStore } from 'pinia'
import { BikeTagDefaults, BikeTagTagsStoreState, Game, Tag } from '../common'

export const useBikeTagTagsStore = defineStore(`${BikeTagDefaults.store}::tags`, {
  state: (): BikeTagTagsStoreState => ({
    tags: [] as unknown as Record<string, Tag[]>,
  }),

  actions: {
    async fetchTags(biketagClient: BikeTagClient, cached = true) {
      const game = (await biketagClient.game()) as Game
      return biketagClient
        .getTags(
          { game: game.name },
          {
            source: BikeTagDefaults.tagSource,
            cached,
          },
        )
        .then((d) => {
          if (d.success) {
            this.tags[game.name] = d.data as unknown as Tag[]
          }
          return this.tags
        })
    },
    async fetchTagsForGame(biketagClient: BikeTagClient, game: string, cached = true) {
      return biketagClient
        .getTags(
          { game },
          {
            source: BikeTagDefaults.tagSource,
            cached,
          },
        )
        .then((d) => {
          if (d.success) {
            this.tags[game] = d.data as unknown as Tag[]
          }
          return this.tags
        })
    },
  },

  getters: {
    getTag: (state) => async (game: string, tagnumber: number) => {
      return (state.tags[game] ?? []).find((t) => t.tagnumber === tagnumber)
    },
    getTags: (state) => async (game: string) => {
      return state.tags[game] ?? []
    },
  },
})
