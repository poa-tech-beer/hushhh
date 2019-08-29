import PropTypes from "prop-types"
import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import { WiredTextarea } from "wired-elements"
import { peer } from "../services/p2p"

// See https://github.com/peers/peerjs/blob/master/examples/index.jsx

/**
 * When user arrives on index with an ID (-> receiver).
 *
 * @see src/pages/index.js
 */
const MessageReceive = ({ id, setAlert }) => {
  const [msgSenderIsNotified, setMsgReceived] = useState(false)
  const [msgContent, setMsgContent] = useState("")

  useEffect(() => {
    // When the user reaches this page, the sender is already waiting on the other
    // "side" (with the id that was sent).
    // @see src/components/MessageSend.js
    const connection = peer.connect(id)

    /**
     * Connection event handler.
     *
     * When peerjs connection will happen through third-party servers (websocket
     * "handshake"), this event handler will be triggered.
     */
    connection.on("open", () => {
      connection.send("I have received your message. Punk.")
      setMsgReceived(true)
      setAlert("receiver has opened your message")
    })

    /**
     * Now the sender.e.s knows we have opened his/her link, so we listen to the
     * 2nd step : sender.e.s sends the actual message content.
     */
    connection.on("data", data => {
      setMsgContent(data)
    })
  }, [id])

  if (msgSenderIsNotified || msgContent.length) {
    let output = ""
    if (msgSenderIsNotified) {
      output = <p>{`The sender is aware you have opened the message. 🕵`}</p>
    }
    if (msgContent.length) {
      output = (
        <div>
          {output}
          <p>{msgContent}</p>
        </div>
      )
    }
    return output
  } else {
    return <p>{`You are opening message id = '${id}'...`}</p>
  }
}

export default MessageReceive
