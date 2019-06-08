import React from "react"
import { navigate } from "gatsby"
import { handleCallback } from "utils/auth"

const Callback = () => {
  handleCallback(redirectUrl => navigate(redirectUrl))

  return <p>Callback... shit</p>
}

export default Callback
