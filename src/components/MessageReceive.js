import PropTypes from "prop-types"
import { Link } from "gatsby"
import React, { useState, useEffect, useRef } from "react"
import { getPeer } from "../services/peerjs"
import Layout from "./Layout"
import styled from "styled-components"

// See https://github.com/peers/peerjs/blob/master/examples/index.jsx

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
// TODO: insert button to show the text
const MessagePreview = (
  <React.Fragment>
    Someone sent you a Secret Message!
    <MessageText>**********</MessageText>
  </React.Fragment>
)

/**
 * When user arrives on index with an ID (-> receiver).
 *
 * @see src/pages/index.js
 */
const MessageReceive = ({ id, setAlert }) => {
  let peer = useRef(null)
  let handleOpen
  let handleData
  const [msgSenderIsNotified, setMsgReceived] = useState(true)
  const [msgContent, setMsgContent] = useState("The fake message")
  const [previewMessage, setPreviewMessage] = useState(false)

  useEffect(() => {
    /**
     * Make using peerjs async (workaround Gatsby build error).
     */
    const startPeer = async () => {
      console.log("start peer")
      peer.current = await getPeer()

      // When the user reaches this page, the sender is already waiting on the other
      // "side" (with the id that was sent).
      // @see src/components/MessageSend.js
      const connection = peer.current.connect(id)

      /**
       * Connection event handler.
       *
       * When peerjs connection will happen through third-party servers (websocket
       * "handshake"), this event handler will be triggered.
       */
      handleOpen = () => {
        connection.send("I have received your message. Punk.")
        setMsgReceived(true)
        console.log("handleOpen")
      }
      connection.on("open", handleOpen)

      /**
       * Now the sender.e.s knows we have opened his/her link, so we listen to the
       * 2nd step : sender.e.s sends the actual message content.
       */
      handleData = data => {
        setMsgContent(data)
        console.log("handleData")
      }
      connection.on("data", handleData)
    }

    if (!peer.current) startPeer()

    return () => {
      if (peer.current) {
        peer.current.off("data", handleData)
        peer.current.off("open", handleOpen)
      }
      console.log("off")
    }
  }, [id, peer, setAlert])

  // "React way": when msgContent changes, setAlert
  useEffect(() => {
    setAlert("The sender is aware you have opened the message. 🕵")
  }, [msgContent])

  if (msgSenderIsNotified || msgContent.length) {
    // let output = ""
    // if (msgContent.length) {
    //   output = <MessageText>{msgContent}</MessageText>
    // }
    // return output
    return (
      // TODO : style BG rounded.
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
