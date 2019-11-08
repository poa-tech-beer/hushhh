import styled, { createGlobalStyle } from "styled-components"
import { Link } from "gatsby"

import "modern-normalize/modern-normalize.css"
import "typeface-kalam"

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: #0c101e;
    color: white;
    font-family: "Kalam", cursive;
    font-size: calc(0.75rem + 1.1vw);
  }

  @media (min-width: 75rem) {
    html,
    body {
      font-size: 1.55rem;
    }
  }

  a {
    color: inherit;
  }

  a:hover {
    color: #0085ff;
  }

  input::placeholder {
    font-size: inherit;
    /* color: red; */
  }

  input:focus {
    outline: none;
  }

  .centered {
    margin-left: auto;
    margin-right: auto;
  }
  .text {
    max-width: 36rem;
  }
`

const LinkNotUnderlined = styled(Link)`
  text-decoration: none;
`

const Title = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 150%;
  text-align: center;
`

const FormContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: #0c101e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:focus-within {
    background-color: #060a17;
  }
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
