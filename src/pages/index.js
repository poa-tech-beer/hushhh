import React, { useContext } from "react"
import { Link } from "gatsby"

import Image from "../components/Image"
import SEO from "../components/SEO"
import MessageSend from "../components/MessageSend"

import { AppContext } from "../App"

const IndexPage = () => {
  const { peer } = useContext(AppContext)

  console.log(peer)

  return (
    <>
      <SEO title="Home" />
      <h1>Send a message to your secret friend</h1>
      <p>
        You will need to stay connected in order for the message to be sent when
        your secret friend opens the secret link.
      </p>
      <MessageSend />
    </>
  )
}

export default IndexPage
