import React from "react"

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

// function isAnonymousUser(u: User): u is AnonymousUser {
//   return (<Fish>pet).swim !== undefined
// }

export const UserContext = React.createContext<UserContext>({
  user: AnonymousUser,
  setUser: (u: User) => {},
  logout: () => {},
})
