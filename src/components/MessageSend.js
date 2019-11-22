import React, { useState, useEffect, useCallback, useRef } from "react"
import styled from "styled-components"
import TextareaAutosize from "react-textarea-autosize"

import { getPeer } from "../services/p2p"
import FileUploader from "./FileUploader"

import { ReactComponent as SendButtonIcon } from "../images/send.svg"
import { ReactComponent as ShareButtonIcon } from "../images/share.svg"
import { ReactComponent as CopyButtonIcon } from "../images/copy.svg"

// import { SendButton, CopyButton, ShareButton } from "../"

import { Title, FormContainer, CircleButton } from "./style"

const MessageInput = styled(TextareaAutosize)`
  display: block;
  width: 90vw;
  margin: 1rem auto;
  max-width: 36rem;
  background-color: inherit;
  border: 0 none;
  color: white;
  height: 25%;
  resize: none;
`

const SendButton = styled(CircleButton)`
  display: block;
  border-radius: 48px;
  margin: 0.618rem auto;
`

const CopyButton = styled(CircleButton)`
  display: flex;
  position: inherit;
  margin-left: 10px;
`

const ShareButton = styled(CircleButton)`
  position: fixed;
  bottom: 15%;
  left: 50%;
`

const ShareText = styled.h2`
  display: flex;
  text-decoration: underline white;
  font-size: 115%;
  justify-content: center;
  align-items: center;
`

// See https://github.com/peers/peerjs/blob/master/examples/index.jsx

/**
 * When user arrives on index without an ID (-> sender).
 *
 * @see src/pages/index.js
 */
const MessageSend = ({ onConnected, setAlert, location }) => {
  let peer = useRef(null)
  let connection = useRef(null)
  let formValuesRef = useRef(null)

  const [formValues, setFormState] = useState()
  const [isFormSubmit, setFormSubmit] = useState(false)
  const host = peer.current && `${location.href}?id=${peer.current.id}`

  formValuesRef.current = formValues

  // Add errors event listeners
  const handleConnectionError = err => console.log(err)
  const handleOpen = useCallback(() => {
    connection.current.send(formValuesRef.current)
  }, [])
  const handleData = data => {
    setAlert("Receiver has opened your message.")
  }

  const handleConnection = _connection => {
    _connection.on("error", handleConnectionError)
    _connection.on("open", handleOpen)
    _connection.on("data", handleData)

    connection.current = _connection
  }

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
      const startPeer = async () => {
        peer.current = await getPeer()

        peer.current.on("connection", handleConnection)
      }

      startPeer()
    }

    return () => {
      peer.current && peer.current.off("connection", handleConnection)
    }
  }, [handleConnection])

  // Not submitted yet (enter message + show button "send").
  if (!isFormSubmit) {
    return (
      <FormContainer>
        <Title>
          Sending messages <u>really</u>&nbsp;privately!
        </Title>
        <form
          onSubmit={e => {
            setFormSubmit(true)
            e.preventDefault()
          }}
        >
          <MessageInput
            placeholder="Type your Secret Message✍️"
            autoFocus
            onInput={e => {
              setFormState(e.currentTarget.value)
            }}
            value={formValues}
          />
          <FileUploader />
          <SendButton>
            <SendButtonIcon />
          </SendButton>
        </form>
      </FormContainer>
    )
  }

  // OnSubmit = 1st half : the id is created, message not sent (yet).
  // when receiver opens the link (on src/components/MessageReceive.js), the
  // connection will happen.
  else {
    return (
      <p class="centered text">
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
      </p>
    )
  }
}

export default MessageSend
