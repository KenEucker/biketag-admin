import { BikeTagClient } from 'biketag'
import request from 'request'
import { HttpStatusCode } from '../common/constants'
import { acceptCorsHeaders, getBikeTagAdminOpts, getPayloadAuthorization } from '../common/methods'

const tokenHandler = async (event: any) => {
  /// Bailout on OPTIONS requests
  const headers = acceptCorsHeaders()
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: HttpStatusCode.NoContent,
      headers,
    }
  }

  const authorization = await getPayloadAuthorization(event)
  let body = 'missing authorization header'
  let statusCode = HttpStatusCode.Unauthorized

  if (authorization) {
    const adminBiketagOpts = getBikeTagAdminOpts(
      {
        ...event,
        method: event.httpMethod,
      } as unknown as request.Request,
      true,
      true,
    )

    const adminBiketag = new BikeTagClient(adminBiketagOpts)
    const credentials = await adminBiketag.fetchCredentials(authorization)
    body = JSON.stringify(credentials)
    statusCode = HttpStatusCode.Ok
  } else {
    body = 'invalid authorization'
  }

  return {
    headers,
    body,
    statusCode,
  }
}

export { tokenHandler as handler }
