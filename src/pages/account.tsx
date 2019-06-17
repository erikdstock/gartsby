import React, { useContext } from "react"
import { Router } from "@reach/router"
import { Box, Sans } from "@artsy/palette"

import Layout from "components/Layout"
import {
  PrivateRoute,
  AuthenticatedRouteComponent,
} from "components/PrivateRoute"
import { FavoritesPage } from "components/account/FavoritesPage"
import { UserContext } from "components/AuthenticationProvider"
import { AccountNav } from "components/account/AccountNav"

const DEBUG = false

export const DebugData = ({ debug = false, data }) =>
  debug &&
  data && (
    <Box p={2} bg="black10" width="500px">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  )

const Home: AuthenticatedRouteComponent = () => (
  <Sans size="5t">Account Home</Sans>
)

const AccountPage = () => {
  const { user } = useContext(UserContext)
  return (
    <Layout>
      <Router>
        <PrivateRoute component={AccountNav} path="/account">
          <PrivateRoute component={FavoritesPage} path="favorites" />
          <PrivateRoute component={Home} default />
        </PrivateRoute>
      </Router>
      <DebugData debug={DEBUG} data={user} />
    </Layout>
  )
}

export default AccountPage
