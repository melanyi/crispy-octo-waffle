import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"

const IndexPage = () => (
  <Layout>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <SEO title="Home" />
    <div className="home-content">
      <div className="home-images-container">
        <div class="navbar">
          <a class="active" href="/"><i class="fa fa-fw fa-home"></i> Home</a>
        </div>

        <div className="road-image">
          <a href="/map">
            <button className="go-button">Go!</button>
          </a>
          <input className="origin-input" type="text" name="origin"></input>
          <input className="dest-input" type="text" name="destination"></input>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
