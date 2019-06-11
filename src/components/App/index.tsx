import React from "react"
import { Theme } from "@artsy/palette"
import { UserContext, AnonymousUser, User } from "components/App/UserContext"
import { isBrowser } from "utils/environment"

export class App extends React.Component<any, { user: User }> {
  state = { user: AnonymousUser }

  componentDidMount() {
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
  }

  render() {
    console.log(this.props)
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          setUser: this.setUser,
          logout: this.logout,
        }}
      >
        <Theme>{this.props.children}</Theme>
      </UserContext.Provider>
    )
  }
}
