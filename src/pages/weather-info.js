import React from "react"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GlobalStateContext from "../context/GlobalStateContext"

// ahahahaha
const api_key = "ef1faec356a15d4e78601762990e77fc"

const WeatherInfo = () => {
  const [state] = React.useContext(GlobalStateContext)

  axios(
    `https://api.darksky.net/forecast/${api_key}/${state.startLocation.lat},${state.startLocation.lon}?exclude=minutely,daily,alerts,flags&units=auto`
  ).then(console.log)

  return (
    <Layout>
      <SEO title="Weather" />
      <h1>Weather Info</h1>
    </Layout>
  )
}

export default WeatherInfo
