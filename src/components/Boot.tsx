import React from "react"
import { Theme } from "@artsy/palette"
import { AuthenticationProvider } from "components/AuthenticationProvider"

export const wrapRootElement: React.FC<{ element: React.ComponentType }> = ({
  element,
}) => {
  return (
    <AuthenticationProvider>
      <Theme>{element}</Theme>
    </AuthenticationProvider>
  )
}
