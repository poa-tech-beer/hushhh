import React, { useState, useEffect, useCallback, useRef } from "react"
import styled from "styled-components"
import TextareaAutosize from "react-textarea-autosize"

import { getPeer } from "../services/p2p"
import FileUploader from "./FileUploader"

import { ReactComponent as SendButtonIcon } from "../images/send.svg"
import { ReactComponent as ShareButtonIcon } from "../images/share.svg"
import { ReactComponent as CopyButtonIcon } from "../images/copy.svg"

// import { SendButton, CopyButton, ShareButton } from "../"

import { Title as BaseTitle, FormContainer, CircleButton } from "./style"

const Title = styled(BaseTitle)`
  font-size: 100%;
`

const MessageInput = styled(TextareaAutosize)`
  display: block;
  margin: 1rem auto;
  background-color: inherit;
  border: 0 none;
  color: white;
  resize: none;
  box-shadow: none;
  outline: none;
  font-size: 3.1em;
  width: 100%;
  margin-top: 15%;
  padding-top: 15px;
`

const SendButton = styled(CircleButton)`
  display: block;
  border-radius: 48px;
  margin: 0.618rem auto;
  transition: all 1s;
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
  opacity: ${props => (props.isVisible ? 1 : 0)};
`

const CopyButton = styled(CircleButton)`
  display: flex;
  position: inherit;
  margin-left: 10px;
`

const ShareButton = styled(CircleButton)`
  display: block;
  border-radius: 48px;
  margin: 0.618rem auto;
`

const ShareText = styled.h2`
  display: flex;
  text-decoration: underline white;
  font-size: 115%;
  justify-content: center;
  align-items: center;
`

const AfterSendText = styled(BaseTitle)`
  // font-size: 100%;
  // margin: 12% 2%;
  text-align: center;
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
  const [isFontReady, setFontReady] = useState(false)
  const host = peer.current && `${location.href}?id=${peer.current.id}`

  formValuesRef.current = formValues

  // Add errors event listeners
  const handleConnectionError = err => console.log(err)
  const handleOpen = useCallback(() => {
    connection.current.send(formValuesRef.current)
  }, [])
  const handleData = useCallback(
    data => {
      setAlert("Receiver has opened your message.")
    },
    [setAlert]
  )

  const handleConnection = useCallback(
    _connection => {
      _connection.on("error", handleConnectionError)
      _connection.on("open", handleOpen)
      _connection.on("data", handleData)

      connection.current = _connection
    },
    [handleData, handleOpen]
  )

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

  useEffect(() => {
    document.fonts.ready.then(() => {
      setTimeout(() => {
        setFontReady(true)
      }, 1000)
    })
  }, [])

  console.log(isFontReady)

  // Not submitted yet (enter message + show button "send").
  if (!isFormSubmit) {
    return (
      <>
        <div className="text centered m-v-xl">
          <Title>
            Sending messages <u>really</u>&nbsp;privately!
          </Title>
          <p style={{ textAlign: "center" }}>
            Hush is Peer to Peer. We cannot read your message.
          </p>
        </div>
        <FormContainer>
          <form
            onSubmit={e => {
              setFormSubmit(true)
              e.preventDefault()
            }}
          >
            <div>
              <MessageInput
                rows={1}
                placeholder="Type your Secret Message ✍️"
                autoFocus
                onInput={e => {
                  setFormState(e.currentTarget.value)
                }}
                onFocus={e => {
                  document.body.toggleAttribute("data-bg-alt")
                }}
                onBlur={e => {
                  document.body.toggleAttribute("data-bg-alt")
                }}
                value={formValues}
              />
            </div>
            {/* <FileUploader /> */}
            <SendButton isVisible={!!formValues}>
              <SendButtonIcon />
            </SendButton>
          </form>
        </FormContainer>
      </>
    )
  }

  // OnSubmit = 1st half : the id is created, message not sent (yet).
  // when receiver opens the link (on src/components/MessageReceive.js), the
  // connection will happen.
  else {
    // setAlert("⚠️ Keep this tab open, or your message will be lost!")
    return (
      <div class="m-v-xl">
        <AfterSendText>
          {/* Thank you for submitting your message.
          <br />
          Now send link below to friend then wait for your friend to open the
          message. */}
          <ShareText>
            <br />
            <span>{host}</span>
            <CopyButton onClick={handleShare} />
          </ShareText>
          <ShareButton onClick={handleShare}>
            <ShareButtonIcon />
          </ShareButton>
        </AfterSendText>
      </div>
    )
  }
}

export default MessageSend
