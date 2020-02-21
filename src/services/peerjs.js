// See https://github.com/peers/peerjs
// See https://github.com/jmcker/Peer-to-Peer-Cue-System/blob/master/send.html
// See https://github.com/peers/peerjs/blob/master/examples/index.jsx
// See https://github.com/peers/peerjs/blob/master/examples/index.jsx
export const getPeer = async () => {
  let lastPeerId = null
  const Peer = await import(/* webpackChunkName: "peerjs" */ `peerjs`).then(
    module => module.default
  )

  const peer = new Peer(null, {
    debug: 2,
  })

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
    // alert("" + err)
  })

  return peer
}
