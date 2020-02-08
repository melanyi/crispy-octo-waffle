import React from "react"
import { GlobalStateProvider } from "./src/context/GlobalStateContext"
import "./src/styles/global.css"

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = ({ element }) => (
  <GlobalStateProvider>{element}</GlobalStateProvider>
)
