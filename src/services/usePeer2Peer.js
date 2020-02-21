import { useEffect, useRef, useCallback } from "react"
import { getPeer } from "./peerjs"

/**
 * This custom hook encapsulates everything related to peer to peer
 * communication (initialization, connection, data exchange).
 *
 * It needs the following input :
 * - onData: a function that will get called when data is received.
 * - payload: [optional] the data (string) to send.
 * - id: [optional] the message unique hash (received).
 *
 * It currently uses PeerJS.
 * @see src/services/p2p.js
 */
const usePeer2Peer = (config = {}) => {
  const { id, payload, onData } = config

  let peer = useRef(null)
  let payload = useRef(null)
  let connection = useRef(null)

  /**
   * Carry on sending the payload when the connection heppens between 2 peers.
   */
  const handleOpen = useCallback(() => {
    connection.current.send(payload)
  }, [])

  /**
   * Trigger callback when data is received.
   */
  const handleData = useCallback(data => {
    onData(data)
  }, [])

  /**
   * This is necessary to deal with PeerJS async connection process. It connects
   * to the PeerJS webservice. Once the unique id is generated, it calls
   * handleConnection() to assign event handlers.
   */
  useEffect(() => {
    if (!peer.current) {
      const startPeer = async () => {
        peer.current = await getPeer()

        // If we don't have an ID, we're the sender : we request an id from
        // PeerJS in order to instanciate a new connection (to be shared with
        // the receiver).
        if (!id) {
          peer.current.on("connection", handleConnection)
        }

        // If we are the receiver, we want to connect to the sender by ID.
        else {
          connection = peer.current.connect(id)
          connection.on("data", handleData)
        }
      }
      startPeer()
    }
    return () => {
      peer.current && peer.current.off("connection", handleConnection)
    }
  }, [])

  /**
   * When we are the sender, assign PeerJS connection event handlers (once it is
   * created).
   */
  const handleConnection = useCallback(
    _connection => {
      _connection.on("error", handleConnectionError)
      _connection.on("open", handleOpen)
      _connection.on("data", handleData)
      connection.current = _connection
    },
    [handleData, handleOpen]
  )
}

export default usePeer2Peer
