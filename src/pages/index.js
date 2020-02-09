import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="home-content">
      <div className="home-images-container">
        <div className="road-image">
          <a href = "/map">
          <button className = "go-button">Go!</button>
          </a>
          <input className="origin-input" type="text" name="origin"></input>
          <input className="dest-input" type="text" name="destination"></input>          
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
