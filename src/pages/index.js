import React, { useContext, useState } from "react"
import { Link } from "gatsby"

import Image from "../components/Image"
import SEO from "../components/SEO"
import MessageSend from "../components/MessageSend"
import MessageReceive from "../components/MessageReceive"
import Alert from "../components/Alert"

import { AppContext } from "../App"

const IndexPage = () => {
  const context = useContext(AppContext)
  const currentRoute = new URLSearchParams(window.location.search)
  const id = currentRoute.get("id")
  const [alertItem, setAlert] = useState({})

  const handleAlert = function(msg, type) {
    setAlert({ body: msg, type: type ? type : "default" })
  }

  return (
    <>
      <SEO title="Home" />
      {id ? (
        <MessageReceive id={id} setAlert={handleAlert} />
      ) : (
        <MessageSend setAlert={handleAlert} />
      )}
      {alertItem.body && <Alert item={alertItem} />}
    </>
  )
}

export default IndexPage
