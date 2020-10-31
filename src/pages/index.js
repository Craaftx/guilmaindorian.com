import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { Layer, Scene } from "../components/Scene"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Scene>
      <Layer>0</Layer>
      <Layer>1</Layer>
      <Layer>2</Layer>
      <Layer>3</Layer>
    </Scene>
  </Layout>
)

export default IndexPage
