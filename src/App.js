import React from "react"
import Peer from "peerjs"
import Layout from "./components/Layout"

export const AppContext = React.createContext()

// See https://github.com/peers/peerjs
// See https://github.com/jmcker/Peer-to-Peer-Cue-System/blob/master/send.html
const peer = new Peer(null, {
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

const App = ({ element, props }) => {
  return (
    <AppContext.Provider value={{ peer }}>
      <Layout {...props}>{element}</Layout>
    </AppContext.Provider>
  )
}

export default App
