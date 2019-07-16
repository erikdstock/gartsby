import React from "react"
import { ApolloProvider as Apollo } from "react-apollo"
import { getClient } from "utils/metaphysics"
import { User } from "./AuthenticationProvider"

export const ApolloProvider: React.FC<{ user: User }> = ({
  user,
  children,
}) => {
  const client = getClient(user.jwt)
  return <Apollo client={client} children={children} />
}
