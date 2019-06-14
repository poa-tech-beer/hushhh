import React, { useContext, useState } from "react"
import { Link } from "gatsby"

import Image from "../components/Image"
import SEO from "../components/SEO"
import MessageSend from "../components/MessageSend"
import MessageReceive from "../components/MessageReceive"

import { AppContext } from "../App"

const IndexPage = () => {
  const context = useContext(AppContext)
  const currentRoute = new URLSearchParams(window.location.search)
  const id = currentRoute.get("id")

  const [isConnected, setConnected] = useState(false)

  const handleConnected = function() {
    setConnected(true)
  }

  return (
    <>
      <SEO title="Home" />
      {id ? (
        <MessageReceive id={id} />
      ) : (
        <MessageSend onConnected={handleConnected} />
      )}

      {isConnected && (
        <>
          <p>Peer is connected! (todo component stylish for alerts)</p>
          <code>qsdqsd</code>
        </>
      )}
    </>
  )
}

export default IndexPage
