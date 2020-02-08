import React from "react"
import axios from "axios"
import { Marker, GoogleMap, LoadScript } from "@react-google-maps/api"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GlobalStateContext from "../context/GlobalStateContext"

// ahahahaha
const weatherApiKey = "d9f7da9062592df9c2dea640b3f25f27"
const mapsApiKey = "AIzaSyBXk6lGDtJyh1GIfe71spYt9vvKe0bnwbw"

const MapPage = () => {
  const [state, setState] = React.useContext(GlobalStateContext)
  const [mapState, setMapState] = React.useState("loading")

  React.useEffect(() => {
    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${"Vancouver"}&appid=${weatherApiKey}`
    )
      .then(response => response.data)
      .then(data =>
        setState(prev => ({
          ...prev,
          startLocation: { lat: data.coord.lat, lng: data.coord.lon },
        }))
      )
      .then(() => setMapState("loaded"))
  }, [setState])

  React.useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <Layout>
      <SEO title="Map" />
      {mapState === "loaded" && (
        <LoadScript id="script-loader" googleMapsApiKey={mapsApiKey}>
          <GoogleMap
            id="example-map"
            zoom={8}
            center={state.startLocation}
            mapContainerStyle={{
              height: "100vh",
            }}
          >
            <Marker position={state.startLocation} />
          </GoogleMap>
        </LoadScript>
      )}
    </Layout>
  )
}

export default MapPage
