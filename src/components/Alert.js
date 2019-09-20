import React, { useState, useEffect, useCallback } from "react"

const Alert = ({ item }) => (
  <div
    style={{
      position: `fixed`,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: `rgba(255,255,255,0.3)`,
      padding: `1em`,
      textAlign: `center`,
    }}
  >
    <p style={{ display: `inline-block`, fontSize: `2em`, maxWidth: `33em` }}>
      {item.body}
    </p>
  </div>
)

export default Alert
