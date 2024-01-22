import { Game, Tag } from 'biketag/dist/common/schema'

export type { Game, Tag }

export type BackgroundProcessResults = {
  results: any[]
  errors: boolean
}

export type activeQueue = {
  queuedTags: Tag[]
  completedTags: Tag[]
  timedOutTags: Tag[]
}
