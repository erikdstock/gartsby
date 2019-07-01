import React, { useState } from "react"
import { Sans, Box, Serif, Separator, BorderBox, Flex } from "@artsy/palette"
import { AuthenticatedRouteComponent } from "components/PrivateRoute"
import gql from "graphql-tag"
import ApolloQuery from "react-apollo/Query"

const last4 = (s: string) => {
  const length = s.length
  return s.slice(length - 5, length)
}

const query = gql`
  query MyFavoritesQuery {
    me {
      saved_artworks {
        name
        artworks_connection {
          edges {
            node {
              artist_names
              title
              imageUrl
            }
          }
        }
      }
    }
  }
`

// TODO: Convert this bids page to a favorites page
export const FavoritesPage: AuthenticatedRouteComponent = () => {
  return (
    <ApolloQuery query={query}>
      {({ loading, error, data }: any) => {
        if (loading) return "Loading..."
        if (error)
          return `Error! ( I don't think this is working :( ) ${error.message}`

        return (
          <>
            <Serif size="6">You might have favorites but i wouldn't know</Serif>
          </>
        )
      }}
    </ApolloQuery>
  )
}
