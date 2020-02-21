import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { ReactComponent as PreviewButtonIcon } from "../images/check.svg"
import { CircleButton } from "./style"
import usePeer2Peer from "../services/usePeer2Peer"

const MessageText = styled.h2`
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // min-height: 100vh;
  // padding-top: 20vh;
  text-decoration: underline white;
  font-size: 115%;
  padding: 3em;
  margin: 0 5em;
  border-radius: 1em;
  background-color: #292933;
`
// TODO: insert button to show the text after setPreviewMessage(true)
const MessagePreview = (
  <React.Fragment>
    Someone sent you a Secret Message!
    <MessageText>**********</MessageText>
    <CircleButton>
      <PreviewButtonIcon />
    </CircleButton>
  </React.Fragment>
)

/**
 * When user arrives on index with an ID (-> receiver).
 *
 * @see src/pages/index.js
 */
const MessageReceive = ({ id, setAlert }) => {
  const [msgContent, setMsgContent] = useState("The fake message")

  console.log(id)

  usePeer2Peer({
    id,
    payload: "I have received your message. Punk.",
    onData: data => {
      setMsgContent(data)
    },
  })

  // "React way": when msgContent changes, setAlert
  useEffect(() => {
    setAlert("The sender is aware you have opened the message. 🕵")
  }, [msgContent])

  if (msgContent.length) {
    return (
      <div className="u-vcenter" style={{ textAlign: "center" }}>
        <MessageText>{msgContent}</MessageText>
      </div>
    )
  } else {
    return (
      <div className="u-vcenter" style={{ textAlign: "center" }}>
        <MessageText>{`You are opening message id = '${id}'...`}</MessageText>
      </div>
    )
  }
}

export default MessageReceive
