import { User } from "components/App/UserContext"

// import { getUser } from "./auth"

const apiUrl = `${process.env.GATSBY_API_URL}/api/v1`
// const requestHeaders = (jwt = '')
export const me = async (user: User) => {
  if (user && "jwt" in user) {
    const { jwt } = user
    const response = await fetch(`${apiUrl}/me`, {
      headers: { "x-access-token": jwt },
    } as any)
    const json = await response.json()
    return json
  }
}

export const meBidderPositions = async user => {
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
