import React from "react"
import { Theme } from "@artsy/palette"
import { AuthenticationProvider } from "components/AuthenticationProvider"

export const Boot = ({ children }) => {
  return (
    <AuthenticationProvider>
      <Theme>{children}</Theme>
    </AuthenticationProvider>
  )
}
