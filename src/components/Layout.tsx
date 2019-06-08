import React from "react"
import { Box, Sans, Flex, Button, Separator, color } from "@artsy/palette"
import { StaticQuery, graphql, Link } from "gatsby"
import { isAuthenticated, logout, login } from "../utils/auth"

const AuthButton = () =>
  isAuthenticated() ? (
    <Button onClick={logout}>Log Out</Button>
  ) : (
    <Button onClick={() => login("/")}>Log In</Button>
  )

const NavLink = ({ to, children }) => (
  <Link
    style={{
      margin: "0 10px",
      textDecoration: "none",
      color: color("black80"),
    }}
    activeStyle={{ color: color("black100") }}
    to={to}
  >
    <Sans size="6">{children}</Sans>
  </Link>
)

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <Flex
          as="header"
          px={[0, "5%", "10%"]}
          pb={2}
          justifyContent="flex-end"
          flexDirection="row"
        >
          <Link
            style={{
              flex: "1",
              textDecoration: "none",
              color: color("black100"),
            }}
            to="/"
          >
            <Sans size="12">{data.site.siteMetadata.title}</Sans>
          </Link>

          <Flex
            flex="0 0 400px"
            as="nav"
            alignItems="center"
            mx={2}
            justifyContent="space-between"
          >
            <NavLink to="/auctions">Auctions</NavLink>
            <NavLink to="/account">Profile</NavLink>
          </Flex>
          <Flex alignItems="center">
            <AuthButton />
          </Flex>
        </Flex>
        <Separator />
        <Box py={2} px={[0, "5%", "10%"]}>
          {children}
        </Box>
      </>
    )}
  />
)
