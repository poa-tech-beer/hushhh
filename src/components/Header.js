import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import { LinkNotUnderlined } from "../components/style"

import { ReactComponent as Logo } from "../images/logo.svg"

const Container = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`
const Inner = styled.nav`
  display: flex;
  align-items: center;
  color: white;
  padding: 1.5em 1.618em;
  width: 100%;
`

const LogoContainer = styled.div`
  margin-top: -0.7em;
`

const Header = ({ siteTitle }) => (
  <Container>
    <Inner>
      <LinkNotUnderlined to="/" data-label={siteTitle}>
        <LogoContainer>
          <Logo width="25vw" height={60} />
        </LogoContainer>
      </LinkNotUnderlined>
      <LinkNotUnderlined to="/how-it-works" style={{ marginLeft: "auto" }}>
        🤔 How it works
      </LinkNotUnderlined>
      <LinkNotUnderlined to="/about" style={{ marginLeft: "1.618em" }}>
        👀 About
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
