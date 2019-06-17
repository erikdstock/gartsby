import React from "react"
import { Flex, Sans } from "@artsy/palette"

import { AuthenticatedRouteComponent } from "components/PrivateRoute"
import { NavLink } from "components/NavLink"

export const AccountNav: AuthenticatedRouteComponent = ({ user, children }) => {
  return (
    <>
      <Flex justifyContent="flex-end">
        <Sans style={{ flexGrow: "1" }} color="purple100" size="6">
          Hello, {user.jwt.slice(0, 8)}!
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
}
