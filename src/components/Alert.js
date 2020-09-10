import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { ReactComponent as CrossIcon } from "../images/cross.svg"

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
        // left: 0,
        // opacity: 0,
        margin: "0 25%",
        width: "50%",
      }}
    >
      <p
        style={{
          margin: "0 auto",
          fontSize: "1.75em",
          maxWidth: "20em",
          background: "#0085FF",
          borderRadius: "9px",
          marginTop: "1em",
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
            color: "white",
            cursor: "pointer",
            transition: "color .25s",
          }}
        >
          <CrossIcon />
        </motion.button>
      </p>
    </motion.div>
  )
}

export default Alert
