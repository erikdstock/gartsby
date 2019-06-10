import React from "react"

export interface User {
  jwt: string | null
}

interface UserContext {
  user: User
  setUser: (u: User) => void
  logout: () => void
}

export const AnonymousUser: User = {
  jwt: null,
}

export const UserContext = React.createContext<UserContext>({
  user: AnonymousUser,
  setUser: (u: User) => {},
  logout: () => {},
})
