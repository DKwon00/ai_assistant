import "./Prompt.css";
import Message from "../../Message/components/Message";
import React, { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

export default function Prompt({ chatHistory, setMessage, gameTitle }) {
  const promptControls = useAnimation();
  const lineControls = useAnimation();
  const [input, setInput] = useState("Hello! Ask me a question...");
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    focus: {
      scaleX: 3,
      transition: { duration: 0.5 },
      opacity: 1,
      ease: [0, 0.71, 0.2, 1.01],
    },
    exitFocus: {
      scaleX: 1,
      transition: { duration: 0.5 },
      opacity: 0,
    },
  };

  const promptVariants = {
    hover: {
      backgroundColor: "#1D1D1F",
      color: "#FFF",
      transition: { duration: 0.4 },
    },
    noHover: {
      backgroundColor: "#020203",
      color: "rgba(255, 255, 255, 0.7)",
      transition: { duration: 0.4 },
    },
    focus: {
      backgroundColor: "#1D1D1F",
      borderColor: "#575782",
      color: "#FFF",
      transition: { duration: 0.4 },
    },
    exitFocus: {
      backgroundColor: "#020203",
      color: "rgba(255, 255, 255, 0.7)",
      borderColor: "rgba(255, 255, 255, 0.3)",
      transition: { duration: 0.4 },
    },
  };

  const enter = () => {
    if (!isClicked) {
      lineControls.start("hover");
      promptControls.start("hover");
    }
  };

  const exit = () => {
    if (!isClicked) {
      lineControls.start("noHover");
      promptControls.start("noHover");
    }
  };

  const focus = () => {
    setIsClicked(true);
    if (input === "Hello! Ask me a question...") {
      setInput("");
    }
    lineControls.start("focus");
    promptControls.start("focus");
  };

  const exitFocus = () => {
    setIsClicked(false);
    if (input === "") {
      setInput("Hello! Ask me a question...");
    }

    lineControls.start("exitFocus");
    promptControls.start("exitFocus");
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && input != "") {
        setIsLoading(true);
        setMessage((message) => [
          ...message, ["0", input],
        ]);
        //reset the submission box
        setInput("");
        //update the messages with the chatbot input
        await fetch(process.env.ROOT_URL + '/send?message=' + input + '&title=' + gameTitle)
            .then((data) => data.json())
            .then((data) => 
            {
              setMessage((message) => [
                ...message, ["1", data],
              ]);
            });
      setIsLoading(false);
    }
  };

  return (
    gameTitle !== undefined ? (
      <motion.div
        initial={{ y: [0, 0] }}
        animate={{ y: [50, 0] }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <motion.div className="promptContainer">
          <motion.input
            className="prompt"
            value={input}
            variants={promptVariants}
            animate={promptControls}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onHoverStart={() => enter()}
            onHoverEnd={() => exit()}
            onFocus={() => focus()}
            onBlur={() => exitFocus()}
          />

          <motion.div
            className="promptLine"
            variants={lineVariants}
            animate={lineControls}
            initial="noHover"
          />
        </motion.div>
        <ScrollToBottom className="messageContainer">
          {chatHistory.map((text) => (
            <Message role={text[0]} chat={text[1]}></Message>
          ))}
          {isLoading ? <Message role="2" chat=" "></Message> : null}
        </ScrollToBottom>
    </motion.div>
    ) : null
  );
}
