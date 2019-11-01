import PropTypes from "prop-types"
import React from "react"
import { LinkNotUnderlined } from "../components/style"

const Header = ({ siteTitle }) => (
  <header>
    <nav
      style={{
        display: "flex",
        color: "white",
        margin: "5px",
        padding: "5px",
        width: "100%",
      }}
    >
      <LinkNotUnderlined to="/">{siteTitle}</LinkNotUnderlined>
      <LinkNotUnderlined to="/how-it-works" style={{ marginLeft: "auto" }}>
        How it works? 💡
      </LinkNotUnderlined>
      <LinkNotUnderlined to="/about" style={{ marginLeft: ".618em" }}>
        About 👀
      </LinkNotUnderlined>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
