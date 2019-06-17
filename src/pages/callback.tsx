import React, { useContext, useEffect } from "react"
import { navigate } from "gatsby"
import { UserContext } from "components/AuthenticationProvider"
import { handleCallback } from "utils/auth"

const Callback = () => {
  const { setUser } = useContext(UserContext)

  const redirectHandler = redirectUrl => {
    navigate(redirectUrl, { replace: true })
  }

  // setUser as dependency to prevent firing multiple times when setUser changes the context
  // TODO: Does this need to be in an effect?
  useEffect(() => {
    handleCallback(setUser, redirectHandler)
  }, [setUser])

  return <p>Callback</p>
}

export default Callback
