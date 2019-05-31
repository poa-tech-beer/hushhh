import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

const MessageSend = () => {
  const [formValues, setFormState] = useState()

  return (
    <form onSubmit={(e) => {
      console.log(e.currentTarget)

      // sent to PeerJS

      e.preventDefault()
    }}>
      <p>Textarea to fill</p>
      <textarea
        style={{
          display: `block`,
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
        onChange={(e) => {
          setFormState(e.currentTarget.value)
        }}
        value={formValues}
      />
      <button
        style={{
          display: `block`,
          margin: `0 auto`,
          maxWidth: 360,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        Enviar
    </button>
    </form>
  )
}

export default MessageSend
