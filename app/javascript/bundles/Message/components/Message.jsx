import "./Message.css";
import { motion } from "framer-motion";
import icon from "./minecraftIcon.png"
import React from 'react';

export default function Message(props) {
  if (props.message) {
    return (
      <motion.div
        className="message"
        initial={{ y: [0, 0] }}
        animate={{ y: [50, 0] }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <img src={icon} />
        <div className="text">{props.message}</div>
      </motion.div>
    );
  }
}