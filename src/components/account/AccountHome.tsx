import { Query } from "react-apollo"
import { AuthenticatedRouteComponent } from "components/PrivateRoute"
import React from "react"
import { Box, Sans } from "@artsy/palette"
import { gql } from "apollo-boost"

const query = gql`
  query HomeQuery {
    me {
      memberSince: created_at
    }
  }
`

export const AccountHome: AuthenticatedRouteComponent = () => {
  return (
    <Query query={query}>
      {({ loading, error, data }: any) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`
        return (
          <Box>
            <Sans size="5t">Account Home</Sans>
            <Sans size="4">
              You have been a member since {data.me.memberSince}
            </Sans>
          </Box>
        )
      }}
    </Query>
  )
}
