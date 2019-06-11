import React, { useContext } from "react"
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
  const { user } = useContext(UserContext)
  if (!user.jwt) {
    location
      ? navigate(`/login?redirectTo=${location.pathname}`)
      : navigate(`/login`)
    return null
  } else {
    return <Component {...rest} />
  }
}
