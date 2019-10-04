import React, { useState, useEffect, useCallback } from "react"
import { peer } from "../services/p2p"

// See https://github.com/peers/peerjs/blob/master/examples/index.jsx

/**
 * When user arrives on index without an ID (-> sender).
 *
 * @see src/pages/index.js
 */
const MessageSend = ({ onConnected, setAlert }) => {
  const [formValues, setFormState] = useState()
  const [isFormSubmit, setFormSubmit] = useState(false)
  const host = `${window.location.href}?id=${peer.id}`
  const linkWhats = `https://wa.me/?text=${host}`

  // Add errors event listeners
  const handleConnectionError = useCallback(err => console.log(err), [])

  const handleConnection = useCallback(
    connection => {
      connection.on("error", handleConnectionError)
      connection.on("open", () => {
        connection.send(formValues)
      })
      connection.on("data", data => {
        setAlert("Receiver has opened your message.")
      })
    },
    [formValues, handleConnectionError, onConnected]
  )

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: "Web Fundamentals",
          text: "Check out Web Fundamentals — it rocks!",
          url: "https://developers.google.com/web",
        })
        .then(() => console.log("Successful share"))
        .catch(error => console.log("Error sharing", error))
    } else {
      console.log("navigator.share is undefined")
    }
  }, [])

  useEffect(() => {
    /**
     * Event handler: when the receiver opens the link
     *
     * (so, keep window open, for heaven's sake)
     */
    peer.on("connection", handleConnection)

    return () => {
      peer.off("connection", handleConnection)
    }
  }, [handleConnection])

  // Not submitted yet (enter message + show button "send").
  if (!isFormSubmit) {
    return (
      <div>
        <h1 className="textTitle">
          Sending messages &nbsp;<u>really</u>&nbsp;privately!
        </h1>
        <form
          onSubmit={e => {
            setFormSubmit(true)
            e.preventDefault()
          }}
        >
          <input
            id="messageInput"
            placeholder="Type your Secret Message✍️"
            autoFocus
            onInput={e => {
              setFormState(e.currentTarget.value)
            }}
            value={formValues}
          />
          <button id="sendButton" />
        </form>
      </div>
    )
  }

  // OnSubmit = 1st half : the id is created, message not sent (yet).
  // when receiver opens the link (on src/components/MessageReceive.js), the
  // connection will happen.
  else {
    return (
      <div className="textTitle">
        <p>
          Thank you for submitting your message.
          <br />
          Now send link below to friend then wait for your friend to open the
          message.
        </p>
        <div>
          <div id="shareLink">
            <span>{host}</span>
            <button onClick={handleShare} />
          </div>
        </div>
      </div>
    )
  }
}

export default MessageSend
