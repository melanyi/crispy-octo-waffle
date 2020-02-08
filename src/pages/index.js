import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"
import carSvg from "../images/car.svg"
import parkSvg from "../images/park.svg"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="home-content">
      <div className="home-images-container flex">
        <img className="home-small-image" alt="home" src={carSvg} />
        <img className="dest-small-image" alt="park" src={parkSvg} />
        <a href = "/map">
        <button className = "go-button">Go!</button>
        </a>
      </div>
    </div>
  </Layout>
)

export default IndexPage
