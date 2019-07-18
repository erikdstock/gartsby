import React from "react"
import { Theme } from "@artsy/palette"
import {
  AuthenticationProvider,
  UserContext,
} from "components/AuthenticationProvider"
import { ApolloProvider } from "./ApolloProvider"
import { ucs2 } from "punycode"

export const Boot = ({ children }) => {
  return (
    <AuthenticationProvider>
      <UserContext.Consumer>
        {uc => {
          return (
            <ApolloProvider user={uc.user}>
              <Theme>{children}</Theme>
            </ApolloProvider>
          )
        }}
      </UserContext.Consumer>
    </AuthenticationProvider>
  )
}
