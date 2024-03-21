import "./Prompt.css";
import Message from "../../Message/components/Message";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import ScrollToBottom from "react-scroll-to-bottom";
import React from 'react';

export default function Prompt(props) {
  const promptControls = useAnimation();
  const lineControls = useAnimation();
  const [input, setInput] = useState("Hello! Ask me a question...");
  const [message, setMessage] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

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
      scaleX: 4,
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
      borderColor: "#1D1D1F",
      color: "#FFF",
      transition: { duration: 0.4 },
    },
    noHover: {
      backgroundColor: "#020203",
      color: "rgba(255, 255, 255, 0.4)",
      transition: { duration: 0.4 },
    },
    focus: {
      borderColor: "#2E2E3B",
      transition: { duration: 0.4 },
    },
    exitFocus: {
      backgroundColor: "#020203",
      color: "rgba(255, 255, 255, 0.4)",
      borderColor: "#020203",
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
    if (event.key === "Enter") {
        //update the messages with the new input
        //setMessage([...messages, {id: "user", text: input}]);
        setMessage([...message, input]);
        //reset the submission box
        setInput("");

        //update the messages with the chatbot input
        await fetch(process.env.ROOT_URL + '/send?message=' + input)
            .then((data) => data.json())
            .then((data) => 
            {
            //setMessage((messages) => [
            //  ...messages, {id: "chatbot", text: data},
            //]);
            setMessage((message) => [
                ...message, data,
            ]);
            });
    }

  };
    
  const DrawMessages = (props) => {
    return props.msg.map((msg) => {
        return <Message message={msg}></Message>
    }
    )
  }

  return (
    <div>
      <div className="promptContainer">
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
      </div>
      <ScrollToBottom className="messageContainer">
        {props.chatHistory.map((history) => (
            <>
            {history.map((text) => (
                <Message message={text}></Message>
            ))}
            </>
        ))}
        {message.map((text) => (
            <Message message={text}></Message>
        ))}
      </ScrollToBottom>
    </div>
  );
}
