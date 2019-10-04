/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Header from "./Header"
import "./layout.css"

const Layout = ({ children }) => (
  <div
    style={{
      display: `block`,
      alignItems: `center`,
      justifyContent: `center`,
      minHeight: `100vh`,
      backgroundColor: `#0C101E`,
      color: `white`,
    }}
  >
    <Header siteTitle="POA tech beer secret message app" />
    <main>{children}</main>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
