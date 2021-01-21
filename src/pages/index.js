import React, { useRef } from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { Layer, Scene } from "../components/Scene"
import HomeLayer from "../components/HomeLayer"
import AboutLayer from "../components/AboutLayer"
import AboutLayerTwo from "../components/AboutLayerTwo"
import ProjectsLayer from "../components/ProjectsLayer"
import ContactLayer from "../components/ContactLayer"
import WorkWithMeLayer from "../components/WorkWithMeLayer"

const IndexPage = () => {
  const sceneRef = useRef()
  return (
    <Layout>
      <SEO title="Home" />
      <Scene sceneRef={sceneRef}>
        <Layer>
          <HomeLayer />
        </Layer>
        <Layer>
          <AboutLayer sceneRef={sceneRef} />
        </Layer>
        <Layer>
          <AboutLayerTwo sceneRef={sceneRef} />
        </Layer>
        <Layer>
          <ProjectsLayer />
        </Layer>
        <Layer>
          <WorkWithMeLayer />
        </Layer>
        <Layer>
          <ContactLayer />
        </Layer>
      </Scene>
    </Layout>
  )
}

export default IndexPage
