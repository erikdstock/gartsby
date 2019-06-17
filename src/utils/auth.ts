import { browserOnly } from "utils/environment"
import { User, LoggedInUser } from "components/AuthenticationProvider"

const apiUrl = process.env.GATSBY_API_URL
const clientId = process.env.GATSBY_CLIENT_ID
const appUrl = process.env.GATSBY_APP_URL
/**
 * Check whether the user is logged in and convert their `User` object
 * into a LoggedInUser
 * @export
 * @param {User} u
 * @returns {u is LoggedInUser}
 */
export function isLoggedIn(u: User): u is LoggedInUser {
  return typeof u.jwt === "string"
}

/**
 * Trigger the login flow.
 * @param redirectPath
 */
export const redirectToLogin = (redirectPath = "/") =>
  browserOnly(() => {
    window.location.href = loginUrl(redirectPath)
  })

/**
 * Find jwt in the browser address bar, set it as the profile and navigate onwards.
 * @param setUser
 * @param redirectHandler
 */
export const handleCallback = (setUser, redirectHandler) =>
  browserOnly(() => {
    const jwt = getQueryVariable("code")
    if (jwt) {
      setUser({ jwt })
      const redirectTo = getQueryVariable("redirectTo")
      redirectHandler(redirectTo || "/")
    } else {
      redirectHandler("/")
    }
  })

const urlSafeCallbackPath = (redirectPath = "/account") =>
  encodeURIComponent(`${appUrl}/callback?redirectTo=${redirectPath}`)

const loginUrl = redirectPath =>
  `${apiUrl}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${urlSafeCallbackPath(
    redirectPath
  )}`

const getQueryVariable: (key: string) => string | null = (key: string) => {
  const query = window.location.search
    .substring(1)
    .split("&")
    .map(pair => pair.split("="))
  const tokenPair = query.find(kv => kv[0] === key)
  return tokenPair ? tokenPair[1] : null
}
