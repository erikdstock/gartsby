import React, { useContext } from "react"
import { Button, Flex, color, Sans, Separator, Box } from "@artsy/palette"
import { redirectToLogin } from "../utils/auth"
import { NavLink } from "components/NavLink"
import { UserContext } from "./AuthenticationProvider"
import { graphql, Link, navigate, useStaticQuery } from "gatsby"
import { Location } from "@reach/router"

const AuthButton = () => {
  const { user } = useContext(UserContext)
  return user.jwt ? (
    <Button onClick={() => navigate("/logout")}>Log Out</Button>
  ) : (
    <Location>
      {({ location }) => (
        <Button onClick={() => redirectToLogin(location.pathname)}>
          Log In
        </Button>
      )}
    </Location>
  )
}

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  return (
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
  )
}
