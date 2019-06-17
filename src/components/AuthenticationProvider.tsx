import React from "react"
import { isBrowser } from "utils/environment"
import { navigate } from "gatsby"

export class AuthenticationProvider extends React.Component<
  any,
  { user: User }
> {
  state = { user: AnonymousUser }

  componentWillMount() {
    if (isBrowser()) {
      const user: User = window.localStorage.getItem("gatsbyUser")
        ? JSON.parse(window.localStorage.getItem("gatsbyUser") as string)
        : AnonymousUser
      this.setUser(user)
    }
  }

  setUser = (user: User) => {
    window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
    this.setState({ user })
  }

  logout = () => {
    this.setUser(AnonymousUser)
    navigate("/")
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          setUser: this.setUser,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export interface LoggedInUser {
  jwt: string
}

interface LoggedOutUser {
  jwt: null
}

export type User = LoggedInUser | LoggedOutUser

interface UserContext {
  user: User
  setUser: (u: User) => void
  logout: () => void
}

export const AnonymousUser: LoggedOutUser = {
  jwt: null,
}

export const UserContext = React.createContext<UserContext>({
  user: AnonymousUser,
  setUser: _u => {},
  logout: () => {},
})
