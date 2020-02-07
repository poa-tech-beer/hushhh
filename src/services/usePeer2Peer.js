import { useEffect, useRef, useState, useCallback } from "react"
import { getPeer } from "./p2p"

/**
 * Usage
 *
 * @see https://reactjs.org/docs/hooks-custom.html
 */
// const { data } = usePeer2Peer({
//   id: "e3283héy!eyé!eçé",  // <- If we pass an ID, we know we are receiving a message
//   onConnect: handleOpen,   // <- When sending a message : connection.current.send(formValuesRef.current) + When receiving : setMsgReceived(true)
//   onData: handleData,      // <- When sending a message : setAlert("Receiver has opened your message.") + when receiving : setMsgContent(data)
// })

/**
 * Return: { data }
 */
const usePeer2Peer = (config = {}) => {
  const { id, onOpen } = config
  let peer = useRef(null)
  const [data, setData] = useState()

  const handleData = useCallback(() => {
    /**
     * Now the sender.e.s knows we have opened his/her link, so we listen to the
     * 2nd step : sender.e.s sends the actual message content.
     */
    setData(data)
    console.log("handleData")
  }, [data])

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
      connection.on("open", onOpen)
      connection.on("data", handleData)
    }

    if (!peer.current) startPeer()

    return () => {
      if (peer.current) {
        peer.current.off("open", onOpen)
        peer.current.off("data", handleData)
      }
      console.log("off")
    }
  }, [id, peer, handleData, onOpen])

  return { data }
}

export default usePeer
