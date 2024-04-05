import "./clearChat.css";
import icon from "./restart.svg";
import check from "./check.svg";
import close from "./close.svg";
import React, { useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

export default function ClearChat({ selectedTab, setMessage }) {
  const [isClicked, setIsClicked] = useState(false);
  const lineControls = useAnimation();
  const textControls = useAnimation();

  const lineVariants = {
    hover: {
      y: [30, 0],
      transition: { duration: 0.5 },
      opacity: 1,
    },
    noHover: {
      y: [0, 30],
      transition: { duration: 0.5 },
      opacity: 0,
    },
  };

  const textVariants = {
    hover: {
      opacity: 1,
    },
    noHover: {
      opacity: 0.5,
    },
  };
  const enter = () => {
    if (isClicked === false) {
      lineControls.start("hover");
      textControls.start("hover");
    }
  };

  const exit = () => {
    if (isClicked === false) {
      lineControls.start("noHover");
      textControls.start("noHover");
    }
  };

  const handleClick = () => {
    if (isClicked === false) {
      setIsClicked(true);
      lineControls.start("noHover");
    } else {
      textControls.start("hover");
      setIsClicked(false);
    }
    console.log(isClicked);
  };

  const clearChat = async() => {
        //update the messages with the chatbot input
        await fetch(process.env.ROOT_URL + '/destroy?title=' + selectedTab)
        .then(() => setMessage([]));
  };

  return (
    <motion.div
      className="clearContainer"
      onHoverStart={() => enter()}
      onHoverEnd={() => exit()}
      onClick={handleClick}
    >
      <motion.div
        className="clearButton"
        variants={textVariants}
        animate={textControls}
      >
        Clear chat
      </motion.div>
      <img src={icon} alt="restart" className="clearIcon" />
      <motion.div
        className="clearCircle"
        variants={lineVariants}
        animate={lineControls}
        initial="noHover"
      ></motion.div>
      <AnimatePresence className="library">
        {isClicked === true ? (
          <motion.div>
            <motion.div
              className="clearOptions"
              initial={{ x: 100, opacity: 1 }}
              animate={{ x: 10, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.button
                class="optionButton"
                whileHover={{ opacity: 1 }}
                onClick={clearChat}
              >
                <motion.img src={check} className="optionCheck" />
                Yes
              </motion.button>
              |
              <motion.button class="optionButton" whileHover={{ opacity: 1 }}>
                <img src={close} className="optionClose" />
                No
              </motion.button>
            </motion.div>
            <motion.div
              className="clearLine"
              initial={{ x: 200, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.4 }}
            ></motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
