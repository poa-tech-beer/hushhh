import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { ReactComponent as PreviewButtonIcon } from "../images/check.svg"
import { CircleButton, Title } from "./style"
import usePeer2Peer from "../services/usePeer2Peer"

const Container = styled.div`
  position: relative;
  margin-top: -6em;
`

const MessageTitle = styled(Title)`
  margin-bottom: 1em;
`

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80vw;
  min-height: 275px;
  margin: 0 auto;
  padding: 3.5em;
  border-radius: 1em;
  background-color: #2b3042;
`

const ViewMessageBtn = styled(CircleButton)`
  border-radius: 105px 128px 98px 108px;
  width: 90px;
  height: 90px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 2em;
`

const MessageText = styled.h3`
  margin: 0;
  font-size: 3em;
`

const MessageMask = styled.h3`
  font-size: 4.5em;
  letter-spacing: 0.5em;
  margin-top: 0.4em;
  margin-bottom: -0.4em;
`
// TODO: insert button to show the text after setPreviewMessage(true)

/**
 * When user arrives on index with an ID (-> receiver).
 *
 * @see src/pages/index.js
 */
const MessageReceive = ({ id, setAlert }) => {
  const [msgContent, setMsgContent] = useState()
  const [messageUnlocked, setMessageUnlocked] = useState(false)

  console.log("Message receive id = " + id)

  usePeer2Peer({
    openedId: id,
    payload: "I have received your message. Punk.",
    onData: data => {
      setMsgContent(data)
    },
  })

  // "React way": when msgContent changes, setAlert
  useEffect(() => {
    setAlert("The sender is aware you have opened the message. 🕵")
  }, [msgContent, setAlert])

  return (
    <div className="u-vcenter u-text-center">
      <Container>
        <MessageTitle as="h2">Someone sent you a Secret Message!</MessageTitle>
        <MessageContainer>
          {messageUnlocked ? (
            <MessageText>{msgContent || "..."}</MessageText>
          ) : (
            <MessageMask>*********</MessageMask>
          )}
        </MessageContainer>
        <ViewMessageBtn onClick={() => setMessageUnlocked(true)}>
          <PreviewButtonIcon />
        </ViewMessageBtn>
      </Container>
    </div>
  )
}

export default MessageReceive
