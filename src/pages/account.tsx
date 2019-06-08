import React, { useState } from "react"
import { Router, RouteComponentProps } from "@reach/router"
import { login, getUser } from "../utils/auth"

import Layout from "../components/layout"
import { fetchMe } from "utils/gravity"
import { NavLink } from "components/NavLink"
import { Flex, Sans } from "@artsy/palette"

type RouteComponent = React.FunctionComponent<RouteComponentProps>

const Home: RouteComponent = () => <h3>Account Home</h3>
const Settings: RouteComponent = () => <h3>Settings</h3>
const Bids: RouteComponent = () => <h3>Bids</h3>

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
      fetchMe().then(data => setMe(data))
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
          <Router>
            <Settings path="/account/settings" />
            <Bids path="/account/bids" />
            <Home default />
          </Router>
        </Layout>
      </>
    )
  }
}

export default AccountPage
