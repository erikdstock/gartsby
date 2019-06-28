import React, { useContext, useEffect } from "react"
import { navigate } from "gatsby"
import { UserContext } from "components/AuthenticationProvider"

const Logout = () => {
  const { logout } = useContext(UserContext)

  useEffect(() => {
    logout()
    navigate("/")
  })

  return <p>Bye Bye</p>
}

export default Logout
