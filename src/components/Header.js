import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import { LinkNotUnderlined } from "../components/style"

const Container = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`
const Inner = styled.nav`
  display: flex;
  color: white;
  padding: 0.618rem 1.618rem;
  width: 100%;
`

const Header = ({ siteTitle }) => (
  <Container>
    <Inner>
      <LinkNotUnderlined to="/">{siteTitle}</LinkNotUnderlined>
      <LinkNotUnderlined to="/how-it-works" style={{ marginLeft: "auto" }}>
        How it works? 💡
      </LinkNotUnderlined>
      <LinkNotUnderlined to="/about" style={{ marginLeft: ".618em" }}>
        About 👀
      </LinkNotUnderlined>
    </Inner>
  </Container>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
