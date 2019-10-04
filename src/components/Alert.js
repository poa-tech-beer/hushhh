import React, { useState, useEffect, useCallback } from "react"

const Alert = ({ item }) => (
  <div
    style={{
      position: `fixed`,
      top: `3vh`,
      right: 0,
      left: 0,
    }}
  >
    <p
      style={{
        margin: `0 auto`,
        fontSize: `1.75em`,
        maxWidth: `24em`,
        background: `#0085FF`,
        borderRadius: `9px`,
        padding: `1em`,
        textAlign: `center`,
      }}
    >
      {item.body}
    </p>
  </div>
)

export default Alert
