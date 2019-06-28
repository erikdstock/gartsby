import React, { useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { UserContext, LoggedInUser } from "components/AuthenticationProvider"
import { isLoggedIn, redirectToLogin } from "utils/auth"

export type AuthenticatedRouteComponent = React.ComponentType<
  AuthenticatedProps
>

export interface AuthenticatedProps {
  user: LoggedInUser
}
export interface PrivateRouteProps extends RouteComponentProps {
  component: AuthenticatedRouteComponent
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  location,
  ...rest
}) => {
  const { user } = useContext(UserContext)
  if (!isLoggedIn(user)) {
    redirectToLogin(location ? location.pathname : "/")

    return null
  } else {
    return <Component user={user} {...rest} />
  }
}
