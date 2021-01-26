/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import "../scss/index.scss"
import CustomCursor from "./CustomCursor"
import { I18nextProvider } from "react-i18next"
import i18n from "./i18n"

const Layout = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <CustomCursor>{children}</CustomCursor>
    </I18nextProvider>
  )
}

export default Layout
