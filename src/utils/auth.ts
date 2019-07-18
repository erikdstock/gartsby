import { isBrowser, getQueryVariable } from "utils/environment"
import {
  User,
  LoggedInUser,
  AnonymousUser,
} from "components/AuthenticationProvider"

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
export const redirectToLogin = (redirectPath = "/") => {
  if (isBrowser()) {
    window.location.href = loginUrl(redirectPath)
  }
}

/**
 * Find jwt in the browser address bar and return a user.
 */
export const authenticateFromLocation: () => Promise<User> = () => {
  return new Promise(resolve => {
    const jwt = getQueryVariable("code")
    if (jwt) {
      const user: LoggedInUser = { jwt }
      resolve(user)
    } else {
      resolve(AnonymousUser)
    }
  })
}

const urlSafeCallbackPath = (redirectPath = "/account") =>
  encodeURIComponent(`${appUrl}/callback?redirectTo=${redirectPath}`)

const loginUrl = redirectPath =>
  `${apiUrl}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${urlSafeCallbackPath(
    redirectPath
  )}`
