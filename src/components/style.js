import styled, { createGlobalStyle } from "styled-components"
import { Link } from "gatsby"

import "modern-normalize/modern-normalize.css"
import "typeface-kalam"

const GlobalStyle = createGlobalStyle`
  :root,
  html {
    font-size: 100%;
  }

  body {
    color: white;
    font-family: "Kalam", cursive;
    font-size: calc(0.75rem + 1.2vw);
    background-color: #0c101e;
    line-height: 135%;

    @media (min-width: 75rem) {
      font-size: 1.4rem;
    }
  }
  body[data-bg-alt] {
    background-color: #060a17;
  }

  a {
    color: inherit;
  }

  a:hover {
    color: #0085ff;
  }

  input::placeholder,
  ::-moz-placeholder { /* Firefox 19+ */
    font-size: inherit;
    text-align: center;
    opacity: 1;
    color: #4C5365;
    white-space: nowrap;
  }

  input:focus {
    outline: none;
  }

  ul,
  ol {
    @media (min-width: 75rem) {
      padding: 0;
    }
  }

  .centered {
    margin-left: auto;
    margin-right: auto;
  }

  .text {
    padding-right: 1em;
    padding-left: 1em;
    max-width: 32em;

    @media (min-width: 40rem) {
      padding: 0;
    }
  }

  .m-v-xl {
    margin-top: calc(1.5rem + 17%);
    margin-bottom: calc(.75rem + 10%);

    @media (min-width: 75rem) {
      margin-top: 7.5rem;
      margin-bottom: 5.75rem;
    }
  }
`

const LinkNotUnderlined = styled(Link)`
  text-decoration: none;
`

const Title = styled.h1`
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 150%;
  text-align: center;
`

const FormContainer = styled.div`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`

const CircleButton = styled.button`
  display: block;
  // height: 96px;
  // width: 96px;
  border: none;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  // margin-left: -48px;
  background-repeat: no-repeat;
  background-color: inherit;

  &:hover {
    background-color: #0085ff;
  }
`

export { CircleButton, GlobalStyle, Title, LinkNotUnderlined, FormContainer }
