import React, { useContext, useState, useCallback } from "react"

import SEO from "../components/SEO"
import MessageSend from "../components/MessageSend"
import MessageReceive from "../components/MessageReceive"
import Alert from "../components/Alert"

import { AppContext } from "../App"

const IndexPage = ({ location }) => {
  const context = useContext(AppContext)
  const currentRoute = new URLSearchParams(location.search)
  const id = currentRoute.get("id")
  const [alertItem, setAlert] = useState({})

  const handleAlert = useCallback((msg, type) => {
    setAlert({ body: msg, type: type ? type : "default" })
  }, [])

  return (
    <>
      <SEO title="Hushhh" />
      {id ? (
        <MessageReceive id={id} setAlert={handleAlert} />
      ) : (
        <MessageSend setAlert={handleAlert} location={location} />
      )}
      {alertItem.body && <Alert item={alertItem} />}
    </>
  )
}

export default IndexPage
