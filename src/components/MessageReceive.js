import PropTypes from "prop-types"
import { Link } from "gatsby"
import React, { useState, useEffect, useRef } from "react"
import { getPeer } from "../services/p2p"
import Layout from "./Layout"

// See https://github.com/peers/peerjs/blob/master/examples/index.jsx

/**
 * When user arrives on index with an ID (-> receiver).
 *
 * @see src/pages/index.js
 */
const MessageReceive = ({ id, setAlert }) => {
  let peer = useRef(null)
  let handleOpen
  let handleData
  const [msgSenderIsNotified, setMsgReceived] = useState(false)
  const [msgContent, setMsgContent] = useState("")

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
        setAlert("The sender is aware you have opened the message. 🕵")
        console.log("handleData")
      }
      connection.on("data", handleData)
    }

    if (!peer.current) startPeer()

    return () => {
      peer.current.off("data", handleData)
      peer.current.off("open", handleOpen)
      console.log("off")
    }
  }, [id, setAlert])

  if (msgSenderIsNotified || msgContent.length) {
    let output = ""
    if (msgContent.length) {
      output = (
        <div className="textTitle">
          {output}
          <p>{msgContent}</p>
        </div>
      )
    }
    return output
  } else {
    return (
      <p className="textTitle">{`You are opening message id = '${id}'...`}</p>
    )
  }
}

export default MessageReceive
