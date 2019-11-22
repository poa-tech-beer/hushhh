import React from "react"
import { Link } from "gatsby"
import SEO from "../components/SEO"
import { Title } from "../components/style"

const HowItWorks = () => (
  <div class="centered text">
    <SEO title="How it works" />
    <div class="m-v-xl">
      <Title>How it works</Title>
    </div>
    <ol>
      <li>
        Sender opens the index page, writes a message, and submits the form.
      </li>
      <li>Sends the generated link to recipient (e.g. via WhatsApp, etc).</li>
      <li>Keeps the page open until recipient sees the message</li>
      <li>Recipient opens link</li>
      <li>
        A peer to peer connection occurs, and the message is sent directly from
        the sender's device to the recipient's. 🎉
      </li>
    </ol>
    <div style={{ textAlign: "center" }}>
      <Link to="/">Go back to the homepage</Link>
    </div>
  </div>
)

export default HowItWorks
