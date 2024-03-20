import "./Message.css";
import { motion } from "framer-motion";
import React from 'react';

export default function Message(props) {
  if (props.message) {
    return (
      <motion.div
        className="message"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {props.message}
      </motion.div>
    );
  }
}