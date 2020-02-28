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
   * When we are the sender, assign PeerJS connection event handlers (once it is
   * created).
   */
  const handleConnection = useCallback(_connection => {
    console.log("handle connection")
    _connection.on("error", handleConnectionError)
    // _connection.on("open", handleOpen)
    _connection.on("data", handleData)
    connection.current = _connection
    console.log(_connection)
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
    let _peer

    if (!peerId) {
      const startPeer = async () => {
        _peer = await getPeer()
        // setPeer(_peer)
        // console.log("_peer :")
        // console.log(_peer.id)

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
          _peer.on("connection", _connection => {
            // TODO : when we are sender, we want to send the payload.
            _connection.send(payload)
            connection.current = _connection
            console.log(
              "on connection : sender actually sends the payload = " + payload
            )

            // TODO : when we are receiver, when need to let the sender know we
            // received the payload.
          })
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
      _peer && _peer.off("connection", handleConnection)
    }
  }, [])

  return { id: peerId ? peerId : 0 }
}

export default usePeer2Peer
