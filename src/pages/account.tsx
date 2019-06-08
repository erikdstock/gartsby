import React from "react"
import { Router, RouteComponentProps } from "@reach/router"
import { login, getUser, logout } from "../utils/auth"
import { Link } from "gatsby"
import Layout from "../components/layout"

type RouteComponent = React.FunctionComponent<RouteComponentProps>

const Home: RouteComponent = () => <h3>Account Home</h3>
const Settings: RouteComponent = () => <h3>Settings</h3>
const Bids: RouteComponent = () => <h3>Bids</h3>

const AccountPage = () => {
  const user = getUser()
  if (!user) {
    login()
    return <p>Redirecting to login...</p>
  } else
    return (
      <>
        <Layout>
          <nav>
            <Link to="/">Home</Link> <Link to="/account">Account</Link>{" "}
            <Link to="/account/bids">Billing</Link>{" "}
            <Link to="/account/settings">Settings</Link>{" "}
            <a
              href="#logout"
              onClick={e => {
                logout()
                e.preventDefault()
              }}
            >
              Log Out
            </a>
          </nav>
          <pre>Hello, {user.jwt}</pre>
          <Router>
            <Settings path="/account/settings" />
            <Bids path="/account/bids" />
            <Home default />
          </Router>
        </Layout>
      </>
    )
}

export default AccountPage
