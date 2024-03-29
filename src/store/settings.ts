import { BikeTagClient } from 'biketag'
import { getSettingsPayload } from 'biketag/dist/common/payloads'
import { Game } from 'biketag/dist/common/schema'
import request from 'request'
import { getBikeTagAdminOpts, getPayloadOpts } from '../common/methods'

const setttingsHandler = async (event: any) => {
  const biketagOpts = getBikeTagAdminOpts(
    {
      ...event,
      method: event.httpMethod,
    } as unknown as request.Request,
    true,
  )
  const biketag = new BikeTagClient(biketagOpts)
  const game = (await biketag.game(biketagOpts.game, {
    source: 'sanity',
    concise: true,
  })) as unknown as Game
  const biketagPayload = getPayloadOpts(event, {
    imgur: {
      hash: game.mainhash,
    },
    game: biketagOpts.game,
  })
  const settingsResponse = await biketag.getSettings(biketagPayload as getSettingsPayload, {
    source: 'sanity',
  })
  const { success, data } = settingsResponse

  return {
    statusCode: settingsResponse.status,
    body: JSON.stringify(success ? data : settingsResponse),
  }
}

export { setttingsHandler as handler }
