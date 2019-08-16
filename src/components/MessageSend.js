import React, { useState, useEffect, useCallback } from "react"
import { peer } from "../services/p2p"

// See https://github.com/peers/peerjs/blob/master/examples/index.jsx

/**
 * When user arrives on index without an ID (-> sender).
 *
 * @see src/pages/index.js
 */
const MessageSend = ({ onConnected }) => {
  const [formValues, setFormState] = useState()
  const [isFormSubmit, setFormSubmit] = useState(false)
  const host = `${window.location.href}?id=${peer.id}`
  const linkWhats = `https://wa.me/?text=${host}`

  // Add errors event listeners
  const handleConnectionError = useCallback(err => console.log(err), [])

  const handleConnection = useCallback(
    connection => {
      // console.log("Other peer has connected!")

      // This callback comes from the parent.
      // It will show an "alert" component.
      // @see src/pages/index.js
      onConnected()

      connection.on("data", data => {
        console.log("on data : the sender received confirmation.")
        console.log(data)
      })

      connection.on("error", handleConnectionError)

      connection.on("open", () => {
        connection.send(formValues)
      })
    },
    [formValues, handleConnectionError, onConnected]
  )

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
        <h1>Send a message to your secret friend!</h1>
        <p>
          You will need to stay connected in order for the message to be sent
          when your secret friend opens the secret link.
        </p>
        <form
          onSubmit={e => {
            setFormSubmit(true)
            e.preventDefault()
          }}
        >
          <p>Textarea to fill</p>
          <wired-textarea
            style={{
              display: `block`,
              margin: `0 auto`,
              maxWidth: 960,
              padding: `1.45rem 1.0875rem`,
            }}
            onInput={e => {
              setFormState(e.currentTarget.value)
            }}
            value={formValues}
          />
          <button
            style={{
              display: `block`,
              margin: `0 auto`,
              maxWidth: 360,
              padding: `1.45rem 1.0875rem`,
            }}
          >
            Enviar
          </button>
        </form>
      </div>
    )
  }

  // OnSubmit = 1st half : the id is created, message not sent (yet).
  // when receiver opens the link (on src/components/MessageReceive.js), the
  // connection will happen.
  else {
    return (
      <div>
        <p style={{ fontSize: "2em" }}>
          Thank you for submitting your message.
          <br />
          Now send link below to friend then wait for your friend to open the
          message.
        </p>
        <div>
          <a href={linkWhats} data-action="share/whatsapp/share">
            Whatsapp Link
          </a>
          <br />
          <br />
          <pre>{host}</pre>
        </div>
      </div>
    )
  }
}

export default MessageSend
