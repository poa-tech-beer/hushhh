import React from "react"
import { Link } from "gatsby"
import SEO from "../components/SEO"
import { Title } from "../components/style"

const About = () => (
  <div class="centered text">
    <SEO title="About" />
    <div class="m-v-xl">
      <Title>About</Title>
    </div>
    <p>
      <em>Hushhh</em> has been produced by a group of merry comrades
      participating in regular informal meetups.
    </p>
    <p>
      It's a prototype messaging web application designed for decentralized,
      peer to peer communication.
    </p>
    <div style={{ textAlign: "center" }}>
      <Link to="/">Go back to the homepage</Link>
    </div>
  </div>
)

export default About
