import PropTypes from "prop-types"
import { Link } from "gatsby"
import React, { useState } from "react"
import { WiredTextarea } from "wired-elements"
import { peer } from "../services/p2p"

const MessageReceive = ({ id }) => {
  return <p>{`Your message id = '${id}' here.`}</p>
}

export default MessageReceive
