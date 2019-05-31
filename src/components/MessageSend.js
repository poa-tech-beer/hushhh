import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const MessageSend = () => (
  <div
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <p>Textarea to fill</p>
      <textarea></textarea>
      <button>Enviar</button>
    </div>
  </div>
)

export default MessageSend
