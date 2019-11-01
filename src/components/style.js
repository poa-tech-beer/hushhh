import styled, { createGlobalStyle } from "styled-components"
import { Link } from "gatsby"

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: #0c101e;
    color: white;
    font-family: "Nanum Pen Script", cursive;
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
`

const LinkNotUnderlined = styled(Link)`
  text-decoration: none;
`

const Title = styled.h1`
  font-family: "Nanum Pen Script";
  font-style: normal;
  font-weight: normal;
  font-size: 150%;
  text-align: center;
  margin-top: 10vh;
`

const FormContainer = styled.div`
  background-color: #0c101e;

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
