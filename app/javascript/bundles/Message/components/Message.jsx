import "./Message.css";
import { AnimatePresence, motion } from "framer-motion";
import icon from "./logo.png"
import React from 'react';

export default function Message(props) {
  if (props.chat) {
      return (
        <div>
          {props.role === "1" &&
            <motion.div
            className="botMessage"
            initial={{ y: [0, 0] }}
            animate={{ y: [50, 0] }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            exit={{ y: [0, 0] }}
          >
            <img src={icon}></img>  
            <div className="text">{props.chat}</div>
          </motion.div>
          }
          {props.role === "0" &&
            <motion.div
            className="userMessage"
            initial={{ y: [0, 0] }}
            animate={{ y: [50, 0] }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            exit={{ y: [0, 0] }}
          > 
            <div className="text">{props.chat}</div>
          </motion.div>
          }
        </div>

    )
    ;
  }
}
