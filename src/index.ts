import { App, Plugin } from 'vue'

import * as Types from './common/types'
import { BikeTagDefaults, BikeTagEnv } from './common/constants'
import { getBikeTagAdminOpts } from './common/methods'
import { BikeTagAdminStore, initBikeTagAdminStore, useBikeTagAdminStore } from './store'

// import { dynamicFontDirective } from './directives'

import BikeDex from './components/BikeDex.vue'
import { BikeTagCredentials } from 'biketag'

export interface BikeTagAdminPlugin {
  install: (app: App) => void
  useBikeTagAdminStore: () => BikeTagAdminStore
}

export type createBikeTagAdminOptions = Partial<BikeTagCredentials> & {
  includeComponents?: boolean
  includeDirectives?: boolean
}

const createBikeTagAdmin = (
  options: createBikeTagAdminOptions = {
    includeComponents: true,
    includeDirectives: true,
  },
): BikeTagAdminPlugin => {
  initBikeTagAdminStore()

  const install: Plugin = (app: App) => {
    if (options.includeComponents) {
      app.component('BikeDex', BikeDex)
    }
    if (options.includeDirectives) {
      // app.directive('dynamic-font', dynamicFontDirective)
    }
  }

  return { install, useBikeTagAdminStore }
}

export {
  BikeTagDefaults,
  BikeDex,
  BikeTagEnv,
  Types,
  createBikeTagAdmin,
  getBikeTagAdminOpts,
  initBikeTagAdminStore,
  useBikeTagAdminStore,
}
