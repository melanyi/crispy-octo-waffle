import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CustomMap from "../components/customMap"

const MapPage = () => {
  return (
    <Layout>
      <SEO title="Map" />
      <CustomMap />
    </Layout>
  )
}

export default MapPage
