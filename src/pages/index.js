import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GlobalStateContext from "../context/GlobalStateContext"
import "./index.css"

const IndexPage = () => {
  const [state, setState] = React.useContext(GlobalStateContext)

  const handleOriginInput = React.useCallback(e => {
    e.persist()
    setState(prev => ({ ...prev, originValue: e.target.value }))
  }, [setState])

  const handleDestInput = React.useCallback(e => {
    e.persist()
    setState(prev => ({ ...prev, originValue: e.target.value }))
  }, [setState])

  return (
    <Layout>
      <SEO title="Home" />
      <div className="home-content">
        <div className="home-images-container">
          <div className="road-image">
            <Link to="/map">
              <button className="go-button">Go!</button>
            </Link>
            <input
              className="origin-input"
              type="text"
              name="origin"
              placeholder="Origin"
              onChange={handleOriginInput}
              value={state.originValue}
            />
            <input
              className="dest-input"
              type="text"
              name="destination"
              placeholder="Destination"
              onChange={handleDestInput}
              value={state.destValue}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
