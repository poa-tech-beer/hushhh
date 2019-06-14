import React, { useContext } from "react"
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
  return (
    <>
      <SEO title="Home" />
      {id ? <MessageReceive id={id} /> : <MessageSend />}
    </>
  )
}

export default IndexPage
