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

  let [peerId, setPeerId] = useState()
  let connection = useRef(null)

  // TODO find out why we need this workaround : the payload becomes null during
  // the on connection event.
  let payloadRef = useRef(payload)
  payloadRef.current = payload

  /**
   * Trigger callback when data is received.
   */
  const handleData = useCallback(data => {
    onData(data)
  }, [])

  /**
   * When we are sender, we want to send the payload once the connection
   * happened with the receiver.
   */
  const handleConnectionIsOpen = useCallback(() => {
    connection.current.send(payloadRef.current)
  }, [])

  /**
   * PeerJS on connection event handler.
   *
   * When we are the sender, assign error and data PeerJS connection event
   * handlers when connection happens between peers.
   */
  const handlePeerConnected = useCallback(
    _connection => {
      _connection.on("error", handleConnectionError)
      _connection.on("open", handleConnectionIsOpen)
      _connection.on("data", handleData)
      connection.current = _connection

      // Debug
      console.log(
        "on connection : sender actually sends the payloadRef = " +
          payloadRef.current
      )
    },
    [payload]
  )

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
    let _peer

    if (!peerId) {
      const startPeer = async () => {
        _peer = await getPeer()

        // If we don't have an ID, we're the sender : we request an id from
        // PeerJS in order to instanciate a new connection (to be shared with
        // the receiver).
        if (!openedId) {
          console.log("we don't have an ID, we're the sender")

          /**
           * Second PeerJS event handler when the PeerJS webservice sends its
           * response.
           *
           * @see src/services/peerjs.js
           */
          _peer.on("open", () => {
            setPeerId(_peer.id)
          })

          /**
           * PeerJS event handler : when the connection actually happened
           * between 2 peers.
           */
          _peer.on("connection", handlePeerConnected)
        } else {
          // If we are the receiver, we want to connect to the sender by ID.
          console.log(
            "we are the receiver, we want to connect to the sender by ID - openedId = " +
              openedId
          )
          connection.current = _peer.connect(openedId)
          connection.current.on("data", handleData)
        }
      }
      startPeer()
    }

    return () => {
      console.log(" !!! ---> off connection")
      _peer && _peer.off("connection", handlePeerConnected)
    }
  }, [])

  return { id: peerId ? peerId : 0 }
}

export default usePeer2Peer
