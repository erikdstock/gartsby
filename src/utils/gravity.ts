import { getUser } from "./auth"

const apiUrl = `${process.env.GATSBY_API_URL}/api/v1`
// const requestHeaders = (jwt = '')
export const fetchMe = async () => {
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
