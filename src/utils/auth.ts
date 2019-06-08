import { browserOnly } from "utils/environment"
import { navigate } from "gatsby"
interface User {
  jwt: string
}

export const logout = () =>
  browserOnly(() => {
    window.localStorage.removeItem("gatsbyUser")
    navigate("/")
  })

export const login = (redirectPath = "/") =>
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

export const isAuthenticated = () => !!getUser()

// Find jwt in the browser address bar, set it as the profile and navigate onwards.
export const handleCallback = cb =>
  browserOnly(() => {
    const jwt = getQueryVariable("code")
    if (jwt) {
      setUser({ jwt })
      const redirectTo = getQueryVariable("redirectTo")
      cb(redirectTo || "/")
    } else {
      cb("/")
    }
  })

export function getUser(): User | null {
  return browserOnly<User>(() =>
    window.localStorage.getItem("gatsbyUser")
      ? JSON.parse(window.localStorage.getItem("gatsbyUser") as string)
      : null
  )
}

function setUser(u: User): void {
  browserOnly(() => {
    window.localStorage.setItem("gatsbyUser", JSON.stringify(u))
  })
}

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
