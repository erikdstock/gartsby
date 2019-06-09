import { getUser } from "./auth"

const apiUrl = `${process.env.GATSBY_API_URL}/api/v1`
// const requestHeaders = (jwt = '')
export const me = async () => {
  const user = getUser()
  if (user && "jwt" in user) {
    const { jwt } = user
    const response = await fetch(`${apiUrl}/me`, {
      headers: { "x-access-token": jwt },
    })
    const json = await response.json()
    return json
  }
}

export const meBidderPositions = async () => {
  const user = getUser()
  if (user && "jwt" in user) {
    const { jwt } = user
    const response = await fetch(
      `${apiUrl}/me/bidder_positions?sort=-created_at`,
      {
        headers: { "x-access-token": jwt },
      }
    )
    const json = await response.json()
    return json
  }
}
