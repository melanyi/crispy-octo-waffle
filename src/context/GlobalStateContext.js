import React from "react"

const initalState = {
  startLocation: { lat: 0, lon: 0 },
  endLocation: { lat: 0, lon: 0 },
}

const GlobalStateContext = React.createContext(initalState)

export const GlobalStateProvider = ({ children }) => {
  const appState = React.useState(initalState)

  return (
    <GlobalStateContext.Provider value={appState}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalStateContext
