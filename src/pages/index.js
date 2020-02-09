import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GlobalStateContext from "../context/GlobalStateContext"
import "./index.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="home-content">
      <div className="home-images-container">
        <div className="navbar">
          <a className="active" href="/">
            <i className="fa fa-fw fa-home"></i> Home
          </a>
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
