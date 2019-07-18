import React from "react"
import { Flex, Sans } from "@artsy/palette"
import { Query } from "react-apollo"
import { gql } from "apollo-boost"

import { AuthenticatedRouteComponent } from "components/PrivateRoute"
import { NavLink } from "components/NavLink"

const query = gql`
  query MeQuery {
    me {
      name
    }
  }
`

export const AccountNav: AuthenticatedRouteComponent = ({ children }) => {
  return (
    <Query query={query}>
      {({ loading, error, data }: any) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`

        return (
          <>
            <Flex justifyContent="flex-end">
              <Sans style={{ flexGrow: "1" }} color="purple100" size="6">
                Hello, {data.me.name}!
              </Sans>
              <NavLink size="5" to="/account">
                Account
              </NavLink>
              <NavLink size="5" to="/account/favorites">
                My Favorites
              </NavLink>
            </Flex>
            {children}
          </>
        )
      }}
    </Query>
  )
}
