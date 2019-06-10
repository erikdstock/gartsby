import React from "react"
import { Sans, color } from "@artsy/palette"
import { Link } from "gatsby"

export const NavLink = ({ size = "6", to, children }) => (
  <Link
    style={{
      margin: "0 10px",
      textDecoration: "none",
      color: color("black80"),
    }}
    activeStyle={{ color: color("black100") }}
    to={to}
  >
    <Sans size={size}>{children}</Sans>
  </Link>
)
