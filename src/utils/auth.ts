import { browserOnly } from "utils/environment"

import { User, LoggedInUser } from "components/App/UserContext"

export function isLoggedIn(u: User): u is LoggedInUser {
  return typeof u.jwt === "string"
}

export const redirectToLogin = (redirectPath = "/") =>
  browserOnly(() => {
    window.location.href = loginUrl(redirectPath)
  })

const getQueryVariable: (key: string) => string | null = (key: string) => {
  const query = window.location.search
    .substring(1)
    .split("&")
    .map(pair => pair.split("="))
  const tokenPair = query.find(kv => kv[0] === key)
  return tokenPair ? tokenPair[1] : null
}

// Find jwt in the browser address bar, set it as the profile and navigate onwards.
export const handleCallback = (setUser, cb) =>
  browserOnly(() => {
    const jwt = getQueryVariable("code")
    if (jwt) {
      console.log("got jwt")
      setUser({ jwt })
      const redirectTo = getQueryVariable("redirectTo")
      console.log("got redirect:", redirectTo)
      cb(redirectTo || "/")
    } else {
      cb("/")
    }
  })

const urlSafeCallbackPath = (redirectPath = "/account") =>
  encodeURIComponent(
    `${process.env.GATSBY_APP_URL}/callback?redirectTo=${redirectPath}`
  )

const loginUrl = redirectPath =>
  `${
    process.env.GATSBY_API_URL
  }/oauth2/authorize?response_type=code&client_id=${
    process.env.GATSBY_CLIENT_ID
  }&redirect_uri=${urlSafeCallbackPath(redirectPath)}`
