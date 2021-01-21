/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import "../scss/index.scss"
import CustomCursor from "./CustomCursor"

const Layout = ({ children }) => {
  return <CustomCursor>{children}</CustomCursor>
}

export default Layout
