import React from "react"
import axios from "axios"
import {
  DirectionsService,
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
  OverlayView,
} from "@react-google-maps/api"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GlobalStateContext from "../context/GlobalStateContext"

// ahahahaha
const weatherApiKey = "d9f7da9062592df9c2dea640b3f25f27"
const mapsApiKey = "AIzaSyBXk6lGDtJyh1GIfe71spYt9vvKe0bnwbw"

const ZERO_C_AS_KELVIN = 273.1

const Overlay = ({ weatherResp, selectCallback = () => {} }) => {
  return (
    <OverlayView
      position={{ lat: weatherResp.coord.lat, lng: weatherResp.coord.lon }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <button
        type="button"
        onClick={() => selectCallback(weatherResp)}
        className="reset-button"
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: "9999px",
          padding: "0.5rem",
          paddingRight: "1.2rem",
          backgroundColor: "white",
          boxShadow: "var(--shadow)",
        }}
      >
        <div
          style={{
            padding: "0.25rem",
            backgroundColor: "var(--blue-500)",
            borderRadius: "9999px",
            boxShadow: "var(--shadow)",
          }}
        >
          <img
            width="25"
            alt=""
            src={`http://openweathermap.org/img/wn/${weatherResp.weather[0].icon}@2x.png`}
          />
        </div>
        <div
          style={{
            marginLeft: "0.25rem",
          }}
        >
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            {Math.round(weatherResp.main.temp - ZERO_C_AS_KELVIN)}&deg;C
          </div>
          <div>{weatherResp.name}</div>
        </div>
      </button>
    </OverlayView>
  )
}

const cities = [
  "Burnaby",
  "Surrey",
  "Langley",
  "Abbotsford",
  "Chilliwack",
  "Hope",
  "Kamloops",
]

const MapPage = () => {
  const [state, setState] = React.useContext(GlobalStateContext)
  const [weatherLoadState, setWeatherLoadState] = React.useState("loading")
  const [weatherInfo, setWeatherInfo] = React.useState({
    start: null,
    end: null,
    rest: [],
  })
  const [response, setResponse] = React.useState(null)

  React.useEffect(() => {
    console.log(weatherInfo)
  }, [weatherInfo])

  React.useEffect(() => {
    const start = axios(
      `https://api.openweathermap.org/data/2.5/weather?q=Vancouver,BC,CA&appid=${weatherApiKey}`
    )
      .then(response => response.data)
      .then(data => {
        setState(prev => ({
          ...prev,
          startLocation: { lat: data.coord.lat, lng: data.coord.lon },
        }))

        setWeatherInfo(info => ({ ...info, start: data }))
      })

    const end = axios(
      `https://api.openweathermap.org/data/2.5/weather?q=Banff,BC,CA&appid=${weatherApiKey}`
    )
      .then(response => response.data)
      .then(data => {
        setState(prev => ({
          ...prev,
          endLocation: { lat: data.coord.lat, lng: data.coord.lon },
        }))

        setWeatherInfo(info => ({ ...info, end: data }))
      })

    const rest = cities.map(city =>
      axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},BC,CA&appid=${weatherApiKey}`
      )
        .then(response => response.data)
        .then(data =>
          setWeatherInfo(info => ({ ...info, rest: [...info.rest, data] }))
        )
    )

    Promise.all([start, end, ...rest]).then(() => setWeatherLoadState("loaded"))
  }, [setState])

  const directionsCallback = React.useCallback(response => {
    console.log(response)

    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response)
      } else {
        console.log("response: ", response)
      }
    }
  }, [])

  return (
    <Layout>
      <SEO title="Map" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="home-content">
        <div className="navbar">
          <a className="active" href="/">
            <i className="fa fa-fw fa-home"></i> Home
          </a>
          <a className="active" href="/city-list">
            <i className="fa fa-fw fa-search"></i> All Weathers
          </a>
        </div>

        {weatherLoadState === "loaded" && (
          <LoadScript id="script-loader" googleMapsApiKey={mapsApiKey}>
            <GoogleMap
              id="example-map"
              zoom={10}
              center={state.startLocation}
              mapContainerStyle={{ height: "100vh" }}
            >
              <Overlay weatherResp={weatherInfo.start} />
              <Overlay weatherResp={weatherInfo.end} />
              {weatherInfo.rest.map(data => (
                <Overlay
                  position={{ lat: data.coord.lat, lng: data.coord.lon }}
                  weatherResp={data}
                />
              ))}
              <DirectionsService
                options={{
                  destination: state.endLocation,
                  origin: state.startLocation,
                  travelMode: "DRIVING",
                }}
                callback={directionsCallback}
              />
              {response && (
                <DirectionsRenderer options={{ directions: response }} />
              )}
            </GoogleMap>
          </LoadScript>
        )}
      </div>
    </Layout>
  )
}

export default MapPage
