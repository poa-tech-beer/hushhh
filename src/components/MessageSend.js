import React, { useState, useEffect, useCallback, useRef } from "react"
import { getPeer } from "../services/p2p"
import { SendButton, CopyButton, Title, ShareButton, ShareText } from "./style"

// See https://github.com/peers/peerjs/blob/master/examples/index.jsx

/**
 * When user arrives on index without an ID (-> sender).
 *
 * @see src/pages/index.js
 */
const MessageSend = ({ onConnected, setAlert, location }) => {
  let peer = useRef(null)
  let connection = useRef(null)
  let handleConnection

  const [formValues, setFormState] = useState()
  const [isFormSubmit, setFormSubmit] = useState(false)
  const host = peer.current && `${location.href}?id=${peer.current.id}`
  console.log(formValues)

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: "I just sent you a secret message on hushhh.app!",
          url: host,
        })
        .then(() => console.log("Successful share"))
        .catch(error => console.log("Error sharing", error))
    } else {
      console.log("navigator.share is undefined")
    }
  }, [host])

  useEffect(() => {
    /**
     * Event handler: when the receiver opens the link
     *
     * (so, keep window open, for heaven's sake)
     */

    if (!peer.current) {
      // Add errors event listeners
      const handleConnectionError = err => console.log(err)
      const handleOpen = () => {
        console.log("send")
        console.log(formValues)
        connection.current.send(formValues)
      }
      const handleData = data => {
        setAlert("Receiver has opened your message.")
      }

      handleConnection = _connection => {
        _connection.on("error", handleConnectionError)
        _connection.on("open", handleOpen)
        _connection.on("data", handleData)

        connection.current = _connection
      }

      const startPeer = async () => {
        peer.current = await getPeer()
        console.log("start")
        peer.current.on("connection", handleConnection)
      }

      startPeer()
    }

    return () => {
      console.log("off")
      peer && peer.current.off("connection", handleConnection)
    }
  }, [formValues])

  // Not submitted yet (enter message + show button "send").
  if (!isFormSubmit) {
    return (
      <div>
        <Title>
          Sending messages &nbsp;<u>really</u>&nbsp;privately!
        </Title>
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
          <SendButton />
        </form>
      </div>
    )
  }

  // OnSubmit = 1st half : the id is created, message not sent (yet).
  // when receiver opens the link (on src/components/MessageReceive.js), the
  // connection will happen.
  else {
    return (
      <Title>
        Thank you for submitting your message.
        <br />
        Now send link below to friend then wait for your friend to open the
        message.
        <ShareText>
          <br />
          <span>{host}</span>
          <CopyButton onClick={handleShare} />
        </ShareText>
        <ShareButton onClick={handleShare} />
      </Title>
    )
  }
}

export default MessageSend
