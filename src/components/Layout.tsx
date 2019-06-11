import React, { useContext } from "react"
import { Button, Flex, color, Sans, Separator, Box } from "@artsy/palette"
import { redirectToLogin } from "../utils/auth"
import { NavLink } from "components/NavLink"
import { UserContext } from "./App/UserContext"
import { StaticQuery, graphql, Link } from "gatsby"

const AuthButton = () => {
  const { user, logout } = useContext(UserContext)
  return user.jwt ? (
    <Button onClick={() => logout()}>Log Out</Button>
  ) : (
    <Button onClick={() => redirectToLogin("/")}>Log In</Button>
  )
}

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
