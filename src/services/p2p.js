import Peer from "peerjs"

// See https://github.com/peers/peerjs
// See https://github.com/jmcker/Peer-to-Peer-Cue-System/blob/master/send.html
export const peer = new Peer(null, {
  debug: 2,
})

var lastPeerId = null

/**
 * Connected event handler.
 */
peer.on("open", function(id) {
  // Workaround for peer.reconnect deleting previous id
  if (peer.id === null) {
    console.log("Received null id from peer open")
    peer.id = lastPeerId
  } else {
    lastPeerId = peer.id
  }
  console.log("ID: " + peer.id)
})

/**
 * Disconnected event handler.
 */
peer.on("disconnected", function() {
  console.log("Connection lost. Please reconnect")
  // Workaround for peer.reconnect deleting previous id
  peer.id = lastPeerId
  peer._lastServerId = lastPeerId
  peer.reconnect()
})

/**
 * Closed (destroyed) connexion.
 */
peer.on("close", function() {
  console.log("Connection destroyed")
})

/**
 * Error event handler.
 */
peer.on("error", function(err) {
  console.log(err)
  alert("" + err)
})
