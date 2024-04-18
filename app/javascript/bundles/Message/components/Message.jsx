import "./Message.css";
import { AnimatePresence, motion } from "framer-motion";
import icon from "./logo.png"
import React from 'react';

export default function Message(props) {
  if (props.chat) {
      return (
          <motion.div
            className="message"
            initial={{ y: [0, 0] }}
            animate={{ y: [50, 0] }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            exit={{ y: [0, 0] }}
          >
            {props.role === 1 &&
              <img src={icon}></img>
            }     
            <div className="text">{props.chat}</div>
          </motion.div>
    )
    ;
  }
}
