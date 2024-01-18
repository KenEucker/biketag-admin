import { BikeTagClient } from 'biketag'
import { getTagsPayload } from 'biketag/lib/common/payloads'
import { Game } from 'biketag/lib/common/schema'
import request from 'request'
import { getBikeTagAdminOpts, getPayloadOpts } from '../common/methods'

const tagsHandler = async (event: any) => {
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
  const tagsResponse = await biketag.getTags(biketagPayload as getTagsPayload, {
    source: 'imgur',
  })
  const { success, data } = tagsResponse
  return {
    statusCode: tagsResponse.status,
    body: JSON.stringify(success ? data : tagsResponse),
  }
}

export { tagsHandler as handler }
