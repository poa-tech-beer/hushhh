import PropTypes from "prop-types"
import { Link } from "gatsby"
import React, { useState } from "react"
import { WiredTextarea } from "wired-elements"
import { peer } from "../services/p2p"

const MessageSend = () => {
  const [formValues, setFormState] = useState()
  const [isFormSubmit, setFormSubmit] = useState(false)
  console.log(isFormSubmit)

  const host = `${window.location.href}?id=${peer.id}`
  const linkWhats = `https://wa.me/?text=${host}`

  if (isFormSubmit) {
    return (
      <div>
        <p>
          <a href={host}>{host}</a>
        </p>
        <p>
          <a href={linkWhats} data-action="share/whatsapp/share">
            Whatsapp Link
          </a>{" "}
        </p>
      </div>
    )
  } else {
    return (
      <form
        onSubmit={e => {
          setFormSubmit(true)
          e.preventDefault()
        }}
      >
        <p>Textarea to fill</p>
        <wired-textarea
          style={{
            display: `block`,
            margin: `0 auto`,
            maxWidth: 960,
            padding: `1.45rem 1.0875rem`,
          }}
          onChange={e => {
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
}

export default MessageSend
