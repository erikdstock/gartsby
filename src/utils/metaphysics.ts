import ApolloClient from "apollo-boost"

export const getClient = jwt =>
  new ApolloClient({
    uri: process.env.GATSBY_METAPHYSICS_URL,
    headers: { "x-access-token": jwt },
  })
