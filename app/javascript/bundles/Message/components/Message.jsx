import "./Message.css";
import icon from "./logo.png"
import React from 'react';
import Loading from "../../Loading/components/Loading";
import { AnimatePresence, motion } from "framer-motion";

const newMessage = {
  start: {
    y: [0, 0],
    transition: {
      duration: 0.8,
      ease: [0, 0.71, 0.2, 1.01],
    },
  },
  end: {
    y: [50, 0],
  },
};

export default function Message(props) {
  if (props.chat) {
      return (
        <div>
          {props.role === "0" &&
            <motion.div
            className="userMessage"
            variants={newMessage}
            initial="start"
            animate="end"
          > 
            <div className="text">{props.chat}</div>
          </motion.div>
          }
          {props.role === "1" &&
            <motion.div
            className="botMessage"
            variants={newMessage}
            initial="start"
            animate="end"
          >
            <img src={icon}></img>  
            <div className="text">{props.chat}</div>
          </motion.div>
          }
          {props.role === "2" && (
            <motion.div
              className="botMessage"
              variants={newMessage}
              initial="start"
              animate="end"
            >
              <img src={icon}></img>
              <Loading />
            </motion.div>
          )}
        </div>
    );
  }
}
