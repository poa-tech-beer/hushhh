import { useEffect, useRef, useCallback, useState } from "react"
import { getPeer } from "./peerjs"

/**
 * This custom hook encapsulates everything related to peer to peer
 * communication (initialization, connection, data exchange).
 *
 * It needs the following input :
 * - onData: a function that will get called when data is received.
 * - payload: [optional] the data (string) to send to the other peer.
 * - openedId: [optional] the message unique hash (received).
 *
 * It currently uses PeerJS.
 * @see src/services/p2p.js
 */
const usePeer2Peer = (config = {}) => {
  const { openedId, payload, onData } = config

  // let [peer, setPeer] = useState()
  let [peerId, setPeerId] = useState()
  let connection = useRef(null)

  /**
   * Carry on sending the payload when the connection heppens between 2 peers.
   */
  const handleOpen = useCallback(id => {
    connection.current.send(payload)
    console.log("handleOpen")
    console.log(id)
    setPeerId(id)
  }, [])

  /**
   * Trigger callback when data is received.
   */
  const handleData = useCallback(data => {
    onData(data)
  }, [])

  /**
   * Error handling -> browser console.
   */
  const handleConnectionError = err => console.log(err)

  /**
   * This is necessary to deal with PeerJS async connection process. It connects
   * to the PeerJS webservice. Once the unique id is generated, it calls
   * handleConnection() to assign event handlers.
   */
  useEffect(() => {
    if (!peerId) {
      const startPeer = async () => {
        const _peer = await getPeer()
        // setPeer(_peer)
        // console.log(_peer)
        // console.log(_peer._id)

        // If we don't have an ID, we're the sender : we request an id from
        // PeerJS in order to instanciate a new connection (to be shared with
        // the receiver).
        if (!openedId) {
          console.log("on connection")
          _peer.on("connection", handleConnection)
        }

        // If we are the receiver, we want to connect to the sender by ID.
        else {
          connection.current = _peer.connect(openedId)
          connection.current.on("data", handleData)
        }
      }
      startPeer()
    }
    return () => {
      peer && peer.off("connection", handleConnection)
    }
  }, [])

  /**
   * When we are the sender, assign PeerJS connection event handlers (once it is
   * created).
   */
  const handleConnection = useCallback(
    _connection => {
      console.log("handle connection")
      _connection.on("error", handleConnectionError)
      _connection.on("open", handleOpen)
      _connection.on("data", handleData)
      connection.current = _connection
    },
    [handleData, handleOpen]
  )

  return { id: peerId ? peerId : 0 }
}

export default usePeer2Peer
