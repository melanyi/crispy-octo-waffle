import React from "react"

const GlobalStateContext = React.createContext({
  startLocation: { lat: undefined, lon: undefined },
  endLocation: { lat: undefined, lon: undefined },
})

export const GlobalStateProvider = ({ children }) => {
  const appState = React.useState({
    startLocation: { lat: 49.259998, lon: -123.110001 },
    endLocation: { lat: 49.259998, lon: -123.110001 },
  })

  return (
    <GlobalStateContext.Provider value={appState}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalStateContext
