import { Tag, Game } from 'biketag/lib/common/schema'

export type { Tag, Game }

export type BackgroundProcessResults = {
  results: any[]
  errors: boolean
}

export type activeQueue = {
  queuedTags: Tag[]
  completedTags: Tag[]
  timedOutTags: Tag[]
}
