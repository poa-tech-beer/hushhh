import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import MessageSend from "../components/MessageSend"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Send a message to your secret friend</h1>
    <p>You will need to stay connected in order for the message to be sent when your secret friend opens the secret link.</p>
    <MessageSend />
  </Layout>
)

export default IndexPage
