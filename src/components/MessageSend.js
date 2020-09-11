import React, { useState, useEffect, useCallback, useRef } from "react"
import styled from "styled-components"
import TextareaAutosize from "react-textarea-autosize"

// import FileUploader from "./FileUploader"

import { ReactComponent as SendButtonIcon } from "../images/send.svg"
import { ReactComponent as ShareButtonIcon } from "../images/share.svg"
import { ReactComponent as CopyButtonIcon } from "../images/copy.svg"

// import { SendButton, CopyButton, ShareButton } from "../"

import {
  Title as BaseTitle,
  FormContainer,
  CircleButton,
  resetButton,
} from "./style"
import usePeer2Peer from "../services/usePeer2Peer"

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
  font-size: 4em;
  width: 100%;
  padding-top: 15px;

  @media (min-width: 60rem) {
    font-size: 6.05vw;
  }
`

const SendButton = styled(CircleButton)`
  border-radius: 68px 98px 78px 88px;
  padding: 8px;
  margin: 0.618rem auto;
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
  opacity: ${props => (props.isVisible ? 1 : 0)};
`

const CopyButton = styled(resetButton)`
  position: inherit;
  margin-left: 15px;
  color: var(--gray);

  svg path {
    transition: all 0.25s;
  }

  &:hover {
    background-color: transparent;

    svg path {
      fill: #0085ff;
    }
  }
`

const ShareButton = styled(CircleButton)`
  border-radius: 127px 98px 118px 88px;
  padding: 8px;
  margin: 0.618rem auto;
`

const ShareText = styled.span`
  display: flex;
  text-decoration: underline gray;
  justify-content: center;
  align-items: center;
  color: var(--gray);
  font-size: 4em;

  @media (min-width: 60rem) {
    font-size: 5vw;
  }
`

const Container = styled.div`
  text-align: center;
`

// See https://github.com/peers/peerjs/blob/master/examples/index.jsx

/**
 * When user arrives on index without an ID (-> sender).
 *
 * @see src/pages/index.js
 */
const MessageSend = ({ onConnected, setAlert, location }) => {
  let formValuesRef = useRef(null)

  const [formValues, setFormState] = useState()
  const [isFormSubmit, setFormSubmit] = useState(false)

  console.log("usePeer2Peer with payload = " + formValuesRef.current)

  const { id } = usePeer2Peer({
    payload: formValuesRef.current,
    onData: data => {
      setAlert("Receiver has opened your message.")
    },
  })

  console.log("  -> result id = " + id) // undefined

  const host = id && `${window.location.host}?id=${id}`

  // When form is submitted, display alert.
  useEffect(() => {
    if (isFormSubmit) {
      setAlert("⚠️ Keep this tab open, or your message will be lost!")
    }
  }, [isFormSubmit, setAlert])

  formValuesRef.current = formValues

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(host)
  })

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
                maxRows={3}
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
    return (
      <div className="u-vcenter u-text-center">
        <ShareText>
          <br />
          <span>{host}</span>
          {navigator.clipboard && (
            <CopyButton onClick={handleCopy}>
              <CopyButtonIcon />
            </CopyButton>
          )}
        </ShareText>
        <ShareButton onClick={handleShare}>
          <ShareButtonIcon />
        </ShareButton>
      </div>
    )
  }
}

export default MessageSend
