import React, { useContext } from "react"
import { navigate } from "gatsby"
import { UserContext } from "components/App/UserContext"
import { handleCallback } from "utils/auth"

const Callback = () => {
  const { setUser } = useContext(UserContext)
  handleCallback(setUser, redirectUrl => navigate(redirectUrl))

  return <p>Callback... shit</p>
}

export default Callback
