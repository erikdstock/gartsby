import React, { useContext, useEffect } from "react"
import { navigate } from "gatsby"
import { UserContext } from "components/AuthenticationProvider"
import { authenticateFromLocation, isLoggedIn } from "utils/auth"
import { isBrowser, getQueryVariable } from "utils/environment"

const Callback = () => {
  const { setUser } = useContext(UserContext)
  const root = "/"

  useEffect(() => {
    if (isBrowser()) {
      authenticateFromLocation().then(user => {
        setUser(user)
        const destination =
          (isLoggedIn(user) && getQueryVariable("redirectTo")) || root

        navigate(destination, { replace: true })
      })
    }
  }, [])

  return <p>Authenticating...</p>
}

export default Callback
