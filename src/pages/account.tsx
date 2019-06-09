import React, { useState } from "react"
import { Router, RouteComponentProps } from "@reach/router"
import { Flex, Sans, Box } from "@artsy/palette"

import Layout from "components/layout"
import { NavLink } from "components/NavLink"
import { login, getUser } from "utils/auth"
import * as gravity from "utils/gravity"
import { BidsPage } from "components/account/BidsPage"

export type RouteComponent = React.FunctionComponent<RouteComponentProps>

const DEBUG = false

export const DebugData = ({ debug = false, data }) =>
  debug &&
  data && (
    <Box p={2} bg="black10" width="500px">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  )

const Home: RouteComponent = () => <h3>Account Home</h3>
const Settings: RouteComponent = () => <h3>Settings</h3>

interface Me {
  name: string
}

const AccountPage = () => {
  const user = getUser()
  const [me, setMe] = useState<Me | null>(null)
  if (!user) {
    login()
    return <p>Redirecting to login...</p>
  } else {
    if (!me) {
      gravity.me().then(data => setMe(data))
      return <p>Fetching user data...</p>
    }
    return (
      <>
        <Layout>
          <Flex justifyContent="flex-end">
            <Sans style={{ flexGrow: "1" }} color="purple100" size="6">
              Hello, {me.name.split(" ")[0]}!
            </Sans>
            <NavLink size="5" to="/account">
              Account
            </NavLink>
            <NavLink size="5" to="/account/bids">
              My Bids
            </NavLink>
            <NavLink size="5" to="/account/favorites">
              My Favorites
            </NavLink>
          </Flex>
          <DebugData debug={DEBUG} data={me} />
          <Router>
            <Settings path="/account/settings" />
            <BidsPage path="/account/bids" />
            <Home default />
          </Router>
        </Layout>
      </>
    )
  }
}

export default AccountPage
