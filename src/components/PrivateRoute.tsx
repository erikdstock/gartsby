import React from "react"
import { navigate } from "gatsby"
import { RouteComponentProps } from "@reach/router"
import { UserContext, User } from "components/App/UserContext"

interface PrivateRouteProps extends RouteComponentProps {
  component: React.ComponentType
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  location,
  ...rest
}) => {
  const isLoggedIn = (user: User) => typeof user.jwt === "string"
  return (
    <UserContext.Consumer>
      {({ user }) => {
        if (!isLoggedIn(user)) {
          location
            ? navigate(`/login?redirectTo=${location.pathname}`)
            : navigate(`/login`)
          return
        } else {
          return <Component {...rest} />
        }
      }}
    </UserContext.Consumer>
  )
}
