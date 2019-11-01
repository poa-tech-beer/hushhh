import React from "react"
import { Link } from "gatsby"
import SEO from "../components/SEO"
import { Title } from "../components/style"

const About = () => (
  <div class="centered text">
    <SEO title="About" />
    <Title>About</Title>
    <Link to="/">Go back to the homepage</Link>
  </div>
)

export default About
