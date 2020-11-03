import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { Layer, Scene } from "../components/Scene"
import HomeLayer from "../components/HomeLayer"
import AboutLayer from "../components/AboutLayer"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Scene>
      <Layer>
        <HomeLayer />
      </Layer>
      <Layer>
        <AboutLayer />
      </Layer>
      <Layer>
        <AboutLayer />
      </Layer>
    </Scene>
  </Layout>
)

export default IndexPage
