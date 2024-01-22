import {
  Achievement,
  Ambassador,
  Game,
  Player,
  Region,
  Setting,
  Tag,
} from 'biketag/dist/common/schema'

export type { Achievement, Ambassador, Game, Player, Region, Setting, Tag }

export type BackgroundProcessResults = {
  results: any[]
  errors: boolean
}

export type activeQueue = {
  queuedTags: Tag[]
  completedTags: Tag[]
  timedOutTags: Tag[]
}

export type DomainInfo = {
  host: string
  subdomain: string | undefined
  isSubdomain: boolean
}

export interface ProfileMeta {
  name: string
  passcode: string
  social: {
    reddit: string
    instagram: string
    twitter: string
    imgur: string
    discord: string
  }
  options: {
    skipSteps: boolean
  }
}
export interface AmbassadorMeta extends ProfileMeta {
  credentials: {
    imgur: {
      clientId: string
      clientSecret: string
      refreshToken: string
    }
    sanity: {
      projectId: string
      dataset: string
    }
    reddit: {
      clientId: string
      clientSecret: string
      username: string
      password: string
    }
  }
}
export interface Profile {
  name: string
  sub: string
  slug: string
  token?: string
  email?: string
  locale?: string
  nonce?: string
  picture?: string
  user_metadata?: ProfileMeta
  zipcode?: string
}
export interface AmbassadorProfile extends Profile {
  address1: string
  address2: string
  city: string
  country: string
  isBikeTagAmbassador: boolean
  phone: string
  user_metadata?: AmbassadorMeta
  zipcode: string
}
export type BikeTagProfile = Partial<Profile> & Partial<AmbassadorProfile>

export interface BikeTagAdminStoreState {
  dataLoaded: boolean
  achievements: Achievement[]
  tags: Tag[]
  players: Player[]
  profile: BikeTagProfile
}

export interface BikeTagGamesStoreState {
  games: Game[]
  gameContext: Game | null
  gameContextName: string | null
}

export interface BikeTagAmbassadorsStoreState {
  ambassadors: Ambassador[]
}

export interface BikeTagPlayersStoreState {
  players: Player[]
  allPlayers: Player[]
}

export interface BikeTagTagsStoreState {
  tags: Record<string, Tag[]>
}
