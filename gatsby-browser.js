import React from "react"
import { Boot } from "components/Boot"

export const wrapRootElement = ({ element }) => {
  return <Boot>{element}</Boot>
}
