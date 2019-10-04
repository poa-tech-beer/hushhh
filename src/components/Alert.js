import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

const Alert = ({ item }) => {
  const [isOpen, setIsOpen] = useState(true)
  const variants = {
    open: { opacity: 1, top: "3vh" },
    closed: { opacity: 0, top: "-100%" },
  }

  return (
    <motion.div
      // initial={{ rotate: 180, scale: 0 }}
      // animate={{ rotate: 0, scale: 1 }}
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      style={{
        position: "fixed",
        top: "-100%",
        right: 0,
        left: 0,
        opacity: 0,
      }}
    >
      <p
        style={{
          margin: "0 auto",
          fontSize: "1.75em",
          maxWidth: "24em",
          background: "#0085FF",
          borderRadius: "9px",
          padding: "1em",
          textAlign: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{item.body}</span>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ color: "black" }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: "transparent",
            border: "0 none",
            borderRadius: "100%",
            color: "white",
            cursor: "pointer",
          }}
        >
          <svg width="23" height="23" viewBox="0 0 23 23">
            <path
              fill="transparent"
              stroke-width="3"
              stroke="currentColor"
              stroke-linecap="round"
              d="M 3 16.5 L 17 2.5"
            />
            <path
              fill="transparent"
              stroke-width="3"
              stroke="currentColor"
              stroke-linecap="round"
              d="M 2 9.423 L 20 9.423"
              opacity="0"
            />
            <path
              fill="transparent"
              stroke-width="3"
              stroke="currentColor"
              stroke-linecap="round"
              d="M 3 2.5 L 17 16.346"
            />
          </svg>
        </motion.button>
      </p>
    </motion.div>
  )
}

export default Alert
